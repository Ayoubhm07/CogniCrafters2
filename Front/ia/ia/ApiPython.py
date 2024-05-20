from flask import Flask, request, jsonify 
import pandas as pd 
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.svm import SVC 
from pymongo import MongoClient
from flask_cors import CORS 

app = Flask(__name__)
CORS(app)  # Autoriser toutes les origines à accéder à votre API

# Charger les données labellisées depuis le fichier CSV
df_csv = pd.read_csv('ia/ia/Feuille de calcul sans titre - Feuille 1 (3).csv')

# Prétraiter les données
# Ici, vous pouvez effectuer la tokenisation, la lemmatisation, la suppression des stopwords, etc.

# Supprimer les lignes contenant des valeurs NaN
df_csv.dropna(subset=['review', 'labelisation'], inplace=True)

# Vectorisation des données textuelles
vectorizer = TfidfVectorizer()
X_train_vectorized = vectorizer.fit_transform(df_csv['review'])
y_train = df_csv['labelisation']

# Entraîner un modèle de machine learning
model = SVC(kernel='linear')
model.fit(X_train_vectorized, y_train)

# Connexion à la base de données MongoDB
client = MongoClient('localhost', 27017)
db = client['ProductPIM']
collection = db['review']

@app.route('/predict_sentiment', methods=['GET'])
def predict_sentiment():
    # Récupérer les reviews à prédire depuis la base de données MongoDB
    reviews_to_predict = [doc['comment'] for doc in collection.find({}, {'_id': 0, 'comment': 1})]

    # Vectoriser les reviews à prédire
    reviews_vectorized = vectorizer.transform(reviews_to_predict)

    # Prédire les sentiments des reviews
    predicted_sentiments = model.predict(reviews_vectorized)

    # Créer une liste de prédictions
    predictions = [{"review": review, "predicted_sentiment": sentiment} for review, sentiment in zip(reviews_to_predict, predicted_sentiments)]

    return jsonify(predictions)

if __name__ == '__main__':
    app.run(debug=True)

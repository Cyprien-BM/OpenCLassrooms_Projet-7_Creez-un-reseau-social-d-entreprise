# OpenClassrooms / Formation Développeur Web

## Projet 7 : Créez un réseau social d'entreprise

## Instructions préliminaires : 

* Pour ce projet il vous faudra avoir installé :
  * Node.js
  * MySQL 

* Cloner ce repository dans un dossier source vide

```bash
git clone https://github.com/Cyprien-BM/P7---Groupomania-reseau-social-d-entreprise.git
```

## FRONTEND

* Depuis le dossier source, rendez vous dans le dossier frontend avec votre terminal :
```bash
cd frontend
```

* Installez les modules :
```bash
npm install
```

* Créez un fichier '.env' dans le dossier /frontend et y ajouter cette ligne :
```bash
REACT_APP_API_URL=http://localhost:xxxx/
```
  remplacez xxxx par le port depuis lequel le backend va ce lancer (par défaut 3000)

* Démarrez le frontend :
```bash
npm run start
```

Le terminal doit vous afficher un message similaire à celui-ci :

```bash
Local:            http://localhost:8080        
On Your Network:  http://192.xxx.x.xx:8080
```

Et la page http://localhost:8080/login doit s'ouvrir dans votre navigateur

## BACKEND

* Depuis le dossier source, rendez vous dans le dossier frontend avec votre terminal :
```bash
cd backend
```

* Installez les modules :
```bash
npm install
```

* Créez un fichier '.env' dans le dossier /backend et y ajouter ces lignes en remplacant les 'xxxx' par vos données :
```bash
DB_USER = xxxx
DB_PASSWORD = xxxx
TOKEN = xxxx
```
où :
  * DB_USER : le nom d'utilisateur de votre instance MySQL
  * DB_PASSWORD : le mot de passe de votre instance MySQL
  * TOKEN : Un token sécurisé à généré par vos soin (exemple : =y0kTR|{0iD?h3#r~nEkhuS4`k)d)

* Toujours dans le dossier backend, créez un fichier config.json dans le dossier config
```bash
touch config/config.json
```

* Ouvrez le fichier config.json et y ajouter ces lignes en remplacant les 'xxxx' par vos données :
```bash
{
  "development": {
    "username": xxxx,
    "password": xxxx,
    "database": "groupomania_development",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "test": {
    "username": xxxx,
    "password": xxxx,
    "database": "groupomania_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": xxxx,
    "password": xxxx,
    "database": "groupomania_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
```
où :
  * username : le nom d'utilisateur de votre instance MySQL
  * password : le mot de passe de votre instance MySQL


* Mettre en place la base de données :
  
  * Depuis votre terminal, créez la base de données :
    ```bash
    sequelize db:create
    ```
    ou
    ```bash
    npx sequelize db:create
    ```


  * Depuis votre terminal, créez les modèles :
    ```bash
    sequelize db:migrate
    ```
        ou
    ```bash
    npx sequelize db:migrate
    ```

* Lancez le serveur
```bash
node server
```
ou
```bash
nodemon
```

Le terminal doit vous afficher un message similaire à celui-ci :

```bash
Connecté à la base de données MySQL!
Listening on port 3000
```

## POUR LA PREMIERE UTILISATION

* Dans votre naviguateur rendez vous sur le page http://localhost:8080/login si elle n'est pas déjà ouverte

* Cliquez sur 'Inscription' puis créez le premier compte qui servira de compte admin

* Ouvrez un deuxième terminal et connectez vous à mysql depuis celui-ci

* Connectez-vous à la base de données créée (normalement : groupomania_development)
```bash
mysql> use groupomania_development
```
* Importer la commande mySQL setAdmin.sql du dossier source
```bash
mysql> source 'chemin vers le fichier'\setAdmin.sql
```

* Le premier utilisateur créé (avec idUSER = 1) est maintenant l'admin, vous pouvez vérifier celà dans votre terminal mysql grâce à la commande :
```bash
mysql> SELECT isAdmin FROM users WHERE idUSER =1;
```

Résultat attendu :
```bash
+---------+
| isAdmin |
+---------+
|       1 |
+---------+
```
# Réveil des tâches (Android)

Application Android : chaque réveil porte le nom de la chose à faire. À l'heure dite, une notification sonne
avec ce nom, même écran verrouillé et application fermée. En touchant la notification, la tâche s'affiche en
grand et est lue à voix haute.

Ce projet n'a pas été compilé ni essayé sur un téléphone par son auteur. Le premier essai sert aussi de test.

## Obtenir le fichier d'installation (APK) avec GitHub, sans rien installer

1. Créez un compte gratuit sur github.com, puis un nouveau dépôt (bouton « New »), par exemple `reveil-taches`.
2. Sur la page du dépôt, choisissez « uploading an existing file » et glissez-y **tout le contenu** de ce dossier,
   y compris le dossier `.github`. Validez avec « Commit changes ».
   Si le dossier `.github` n'apparaît pas dans le dépôt, créez le fichier à la main : « Add file » > « Create new file »,
   nommez-le `.github/workflows/build-apk.yml`, collez-y le contenu du fichier du même nom, puis validez.
3. Ouvrez l'onglet « Actions ». Le travail « Compiler l'APK » démarre seul (sinon : « Run workflow »).
   Il dure environ 5 à 10 minutes.
4. Quand il est vert, ouvrez-le et téléchargez `reveil-taches-apk` en bas de la page. C'est un fichier zip qui contient `app-debug.apk`.
5. Envoyez `app-debug.apk` sur le téléphone (câble, Drive, e-mail), ouvrez-le et acceptez
   « Installer des applications inconnues » pour l'application utilisée.

## Premier lancement sur le téléphone

- Acceptez les notifications.
- Sur Android 12, touchez « Autoriser les alarmes exactes » et activez l'option.
- Touchez « Tester dans 5 s » : une notification doit sonner avec le nom saisi.
- Réglages d'Android > Applications > Réveil des tâches > Batterie : choisissez « Sans restriction ».
  Sans cela, certains téléphones (Xiaomi, Huawei, Samsung…) retardent ou suppriment les alarmes.

## Limites connues

- L'écran de la tâche en plein écran n'apparaît que lorsque vous touchez la notification. Un écran de réveil
  qui s'ouvre tout seul sur l'écran verrouillé demande une version Android native (Kotlin).
- Le son de la notification dure environ 9 secondes.

## Compiler soi-même (Android Studio)

Avec Node 22, Java 21 et Android Studio :

```
npm install
npm run android:prepare
npx cap open android
```

Puis « Build > Build APK(s) » dans Android Studio.

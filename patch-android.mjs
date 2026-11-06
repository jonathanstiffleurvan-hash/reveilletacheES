// À lancer après « cap add android ».
// Ajoute les autorisations d'alarme, le son de sonnerie et les icônes de l'application.
import fs from 'node:fs';

const main = 'android/app/src/main';
const manifestPath = `${main}/AndroidManifest.xml`;

if (!fs.existsSync(manifestPath)) {
  console.error('Dossier android introuvable : lancez d\'abord « npx cap add android ».');
  process.exit(1);
}

let xml = fs.readFileSync(manifestPath, 'utf8');

const permissions = [
  '<uses-permission android:name="android.permission.POST_NOTIFICATIONS" />',
  '<uses-permission android:name="android.permission.SCHEDULE_EXACT_ALARM" android:maxSdkVersion="32" />',
  '<uses-permission android:name="android.permission.USE_EXACT_ALARM" />',
  '<uses-permission android:name="android.permission.RECEIVE_BOOT_COMPLETED" />',
  '<uses-permission android:name="android.permission.VIBRATE" />',
  '<uses-permission android:name="android.permission.WAKE_LOCK" />',
];

const missing = permissions.filter((line) => {
  const name = line.match(/android:name="([^"]+)"/)[1];
  return !xml.includes(`android:name="${name}"`);
});

if (missing.length > 0) {
  const block = missing.map((l) => `    ${l}`).join('\n') + '\n\n    ';
  xml = xml.replace(/<application\b/, block + '<application');
}

// L'écran de la tâche s'affiche par-dessus l'écran verrouillé quand on touche la notification.
xml = xml.replace(/<activity\b[^>]*>/, (tag) => {
  if (!tag.includes('MainActivity')) return tag;
  let t = tag;
  if (!t.includes('android:showWhenLocked')) t = t.replace('<activity', '<activity android:showWhenLocked="true"');
  if (!t.includes('android:turnScreenOn')) t = t.replace('<activity', '<activity android:turnScreenOn="true"');
  return t;
});

fs.writeFileSync(manifestPath, xml);

fs.mkdirSync(`${main}/res/raw`, { recursive: true });
fs.copyFileSync('resources/alarm.wav', `${main}/res/raw/alarm.wav`);
fs.cpSync('resources/android-res', `${main}/res`, { recursive: true });

console.log('Autorisations, sonnerie et icônes ajoutées.');

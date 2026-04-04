import admin from "firebase-admin";
import { getFirestore } from "firebase-admin/firestore";
import fs from "fs";
import path from "path";

let firebaseConfig: any = {};
try {
  const configPath = path.join(process.cwd(), "firebase-applet-config.json");
  if (fs.existsSync(configPath)) {
    firebaseConfig = JSON.parse(fs.readFileSync(configPath, "utf-8"));
  } else {
    console.warn("firebase-applet-config.json not found at", configPath);
  }
} catch (error) {
  console.error("Error reading firebase-applet-config.json:", error);
}

// Initialize Firebase Admin SDK
try {
  if (!admin.apps.length) {
    admin.initializeApp({
      projectId: firebaseConfig.projectId,
    });
    console.log("Firebase Admin initialized for project:", firebaseConfig.projectId);
  }
} catch (error) {
  console.error("Firebase Admin Initialization Error:", error);
}

// Initialize Firestore
// Try to use the named database if provided, otherwise fallback to default
let firestoreDb: any = null;
try {
  firestoreDb = getFirestore(firebaseConfig.firestoreDatabaseId || "(default)");
  console.log("Firestore initialized with database ID:", firebaseConfig.firestoreDatabaseId || "(default)");
} catch (error) {
  console.warn("Failed to initialize Firestore with named database, falling back to default:", error);
  try {
    firestoreDb = getFirestore();
  } catch (fallbackError) {
    console.error("Failed to initialize default Firestore:", fallbackError);
  }
}

export const db = firestoreDb;

let firebaseAuth: any = null;
try {
  firebaseAuth = admin.auth();
} catch (error) {
  console.error("Failed to initialize Firebase Auth:", error);
}
export const auth = firebaseAuth;
export default admin;

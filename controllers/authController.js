import admin from "firebase-admin";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const db = admin.firestore();

export const registerUser = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const userRef = db.collection("users").doc(); // Generate a new document ID
    const user = {
      firstName,
      lastName,
      email,
      password: hashedPassword,
    };

    await userRef.set(user);

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userSnapshot = await db
      .collection("users")
      .where("email", "==", email)
      .get();

    if (userSnapshot.empty) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const userDoc = userSnapshot.docs[0];
    const user = userDoc.data();

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { user: { id: userDoc.id } },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.cookie("token", token, {
      httpOnly: true, 
      secure: process.env.NODE_ENV === "production", 
      maxAge: 3600000, 
    });

    res.status(200).json({ message: "Logged in successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

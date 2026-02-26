# NeoLedger: Employee Blockchain Application 🚀

A modern, educational web application simulating how a blockchain works using employee records. Built with React and Vite, featuring a custom cryptographic Hash & Proof-of-Work implementation.

## ✨ Features
- **True Cryptographic Hashing**: Simulates SHA-256 style block hashing in pure JavaScript.
- **Proof-of-Work Mechanism**: "Mines" blocks by generating nonces until the hash difficulty matches.
- **Data Tampering Demonstration**: Includes a feature to break data inside a block, immediately visualizing how the blockchain detects invalid records and severs links to subsequent blocks.
- **Premium Glassmorphism UI**: Beautiful, modern dark-mode aesthetic with interactive micro-animations and glowing gradients.
- **Employee Directory**: Easily view all valid records currently stored in the blockchain.

---

## 💻 How to Run Locally

### Requirements
You **MUST** have Node.js installed to run this project.
* **Node.js**: `v18.0.0` or higher (The project has been configured to support Node 18+).
* **NPM**: `8.0.0` or higher (comes with Node.js).

### Installation Steps

1. **Download or Clone the Repository**
2. **Open a Terminal** and navigate to the project directory:
   ```bash
   cd employee-blockchain
   ```
3. **Install Dependencies**:
   ```bash
   npm install
   ```
   *(This downloads Vite, React, and other necessary libraries into the `node_modules` folder).*

4. **Start the Development Server**:
   ```bash
   npm run dev
   ```
5. **Open the App**:
   The terminal will output a local address (usually `http://localhost:5173/`). Hold `Ctrl` and click that link, or paste it into your browser.

---

## 🛡️ How to Use & Test the Blockchain

1. **The Genesis Block**: When the app opens, you will see the "Genesis Block" (Block #0). This is the hardcoded start of every blockchain.
2. **Adding Data**: Enter an employee's details in the form and click "Add to Blockchain".
3. **Mining**: The app will briefly say "Mining Block...". Behind the scenes, the computer is calculating thousands of hashes to find a mathematically valid block (Proof-of-Work).
4. **Verifying Security (Tampering)**: 
   - Click the **"Tamper Data"** button on any employee block.
   - Change a single letter in their name or department.
   - Click **"Apply Tamper"**.
   - Notice how the UI instantly flags the block as "Invalid" because the math no longer checks out. You'll see the chain break, proving the ledger is secure!

---

## 🛠️ Tech Stack
* **Frontend**: React (JS)
* **Build Tool**: Vite (v5.4.11 for Node 18 compatibility)
* **Styling**: Pure CSS (No external libraries!)
* **Blockchain Logic**: Custom ES6 Classes (`Block.js`, `Blockchain.js`)

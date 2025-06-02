import React, { useState } from 'react';
import { app } from '../firebase' // Adjust path as needed
import { collection, getDocs, getFirestore } from "firebase/firestore";
const firestore = getFirestore(app);
const MenuWithDocuments = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [docIds, setDocIds] = useState([]);

    const handleMenuClick = async () => {
        setMenuOpen(!menuOpen);

        if (!menuOpen) {
            try {
                const querySnapshot = await getDocs(collection(firestore, "webscrap")); // Your collection name
                // ✅ Store { id, book_name } (or full data) in state
                const docs = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),        // doc.data().book_name, doc.data().books, etc.
                }));
                setDocIds(docs);

            } catch (error) {
                console.error("Error fetching document IDs:", error);
            }
        }
    };

    return (
        <div>
            <button onClick={handleMenuClick} className="px-4 py-2 bg-green-600 text-white rounded">
                {menuOpen ? 'Hide Document List' : 'Show Document List'}
            </button>

            {menuOpen && (
                <ul className="mt-4 list-disc pl-6">
                    {docIds.length === 0 ? (
                        <li>No documents found</li>
                    ) : (
                        docIds.map((id) => <li key={id}>{id.book_name}</li>)
                    )}
                </ul>
            )}
        </div>
    );
};

export default MenuWithDocuments;

import React, { useState, useEffect } from "react";

export default function ContactManager() {
  const [contacts, setContacts] = useState([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("contacts");
    if (stored) setContacts(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  const addContact = () => {
    if (name && phone && email) {
      setContacts([...contacts, { name, phone, email }]);
      setName(""); setPhone(""); setEmail("");
    }
  };

  const deleteContact = (target) => {
    setContacts(contacts.filter(c => c.name !== target));
  };

  const startEdit = (c) => {
    setEditing(c);
    setName(c.name);
    setPhone(c.phone);
    setEmail(c.email);
  };

  const updateContact = () => {
    const updated = contacts.map(c =>
      c.name === editing.name ? { name, phone, email } : c
    );
    setContacts(updated);
    setEditing(null);
    setName(""); setPhone(""); setEmail("");
  };

  const filtered = contacts.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.phone.includes(search)
  );

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Contact Manager</h1>
      <input placeholder="Name" style={styles.input} value={name} onChange={e => setName(e.target.value)} />
      <input placeholder="Phone" style={styles.input} value={phone} onChange={e => setPhone(e.target.value)} />
      <input placeholder="Email" style={styles.input} value={email} onChange={e => setEmail(e.target.value)} />
      <button style={styles.button} onClick={editing ? updateContact : addContact}>
        {editing ? "Update" : "Add"} Contact
      </button>

      <input placeholder="Search" style={styles.input} value={search} onChange={e => setSearch(e.target.value)} />

      {filtered.map((c, idx) => (
        <div key={idx} style={styles.card}>
          <b>{c.name}</b><br />
          {c.phone}<br />
          {c.email}<br />
          <div style={styles.cardButtons}>
            <button style={styles.editButton} onClick={() => startEdit(c)}>Edit</button>
            <button style={styles.deleteButton} onClick={() => deleteContact(c.name)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}

const styles = {
  container: { padding: 16, maxWidth: 500, margin: "auto", fontFamily: "Arial" },
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 20, textAlign: "center", color: "#2c3e50" },
  input: { display: "block", width: "100%", padding: 10, marginBottom: 10, borderRadius: 6, border: "1px solid #ccc" },
  button: { backgroundColor: "#3498db", color: "white", border: "none", padding: 12, borderRadius: 6, width: "100%", marginBottom: 20, cursor: "pointer" },
  card: { backgroundColor: "#fff", padding: 12, marginBottom: 10, borderRadius: 8, boxShadow: "0 0 4px rgba(0,0,0,0.1)" },
  cardButtons: { display: "flex", justifyContent: "space-between", marginTop: 10 },
  editButton: { backgroundColor: "#f1c40f", color: "#fff", padding: "6px 12px", border: "none", borderRadius: 6, cursor: "pointer" },
  deleteButton: { backgroundColor: "#e74c3c", color: "#fff", padding: "6px 12px", border: "none", borderRadius: 6, cursor: "pointer" },
};

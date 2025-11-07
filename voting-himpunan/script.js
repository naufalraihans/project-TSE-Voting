// =====================
// Supabase setup
// =====================
const SUPABASE_URL = "https://ejsrrgrkqepsyuttuwsv.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVqc3JyZ3JrcWVwc3l1dHR1d3N2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI1MDAzMTgsImV4cCI6MjA3ODA3NjMxOH0.UrJohS6aneO6Zch724pcDyir-i9xLl7VwE8yZiLUA7U";

async function insertVote(nim, nama, pilihan) {
  const response = await fetch(`${SUPABASE_URL}/rest/v1/votes`, {
    method: "POST",
    headers: {
      "apikey": SUPABASE_ANON_KEY,
      "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
      "Content-Type": "application/json",
      "Prefer": "return=representation"
    },
    body: JSON.stringify({ nim, nama, pilihan })
  });
  const data = await response.json();
  return data;
}

async function getVotes() {
  const response = await fetch(`${SUPABASE_URL}/rest/v1/votes?select=*`, {
    method: "GET",
    headers: {
      "apikey": SUPABASE_ANON_KEY,
      "Authorization": `Bearer ${SUPABASE_ANON_KEY}`
    }
  });
  const data = await response.json();
  return data;
}

// =====================
// Event listeners
// =====================
document.getElementById("voteForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const nim = document.getElementById("nim").value;
  const nama = document.getElementById("nama").value;
  const pilihan = document.getElementById("pilihan").value;

  if (!nim || !nama || !pilihan) return alert("Lengkapi semua field!");

  await insertVote(nim, nama, pilihan);
  alert("Vote berhasil disimpan!");
  e.target.reset();
});

document.getElementById("loadVotes").addEventListener("click", async () => {
  const votes = await getVotes();
  const ul = document.getElementById("hasilVote");
  ul.innerHTML = "";
  votes.forEach(v => {
    const li = document.createElement("li");
    li.textContent = `${v.nama} (${v.nim}) memilih ${v.pilihan}`;
    ul.appendChild(li);
  });
});

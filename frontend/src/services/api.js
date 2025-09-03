// Simple localStorage-based mock API to simulate backend behavior

const LS_USERS = 'tbf_users'
const LS_TRIPS = 'tbf_trips'
const LS_REQS  = 'tbf_requests'

function uid() { return Math.random().toString(36).slice(2, 10) }

export function init() {
  if (!localStorage.getItem(LS_USERS)) {
    const demoId = uid()
    const users = [{
      id: demoId,
      name: 'Demo User',
      email: 'demo@travel.com',
      password: 'demo123',
      bio: 'Love mountains and coffee.',
      interests: ['trekking', 'photography'],
      preferredLocations: ['Manali', 'Leh']
    },
    {
      id: uid(),
      name: 'Aarav Shah',
      email: 'aarav@example.com',
      password: 'pass123',
      interests: ['beaches', 'food'],
      preferredLocations: ['Goa', 'Kerala']
    },
    {
      id: uid(),
      name: 'Sara Khan',
      email: 'sara@example.com',
      password: 'pass123',
      interests: ['culture', 'temples'],
      preferredLocations: ['Varanasi', 'Jaipur']
    }]
    localStorage.setItem(LS_USERS, JSON.stringify(users))
  }
  if (!localStorage.getItem(LS_TRIPS)) {
    localStorage.setItem(LS_TRIPS, JSON.stringify([]))
  }
  if (!localStorage.getItem(LS_REQS)) {
    localStorage.setItem(LS_REQS, JSON.stringify([]))
  }
}

function read(key) { return JSON.parse(localStorage.getItem(key) || '[]') }
function write(key, val) { localStorage.setItem(key, JSON.stringify(val)) }

export async function login(email, password) {
  const users = read(LS_USERS)
  const user = users.find(u => u.email === email && u.password === password)
  if (!user) throw new Error('Invalid email or password')
  return { user: sanitize(user), token: user.id }
}

export async function signup({ name, email, password }) {
  const users = read(LS_USERS)
  if (users.some(u => u.email === email)) throw new Error('Email already used')
  const user = { id: uid(), name, email, password, interests: [], preferredLocations: [] }
  users.push(user); write(LS_USERS, users)
  return { user: sanitize(user), token: user.id }
}

function sanitize(user) {
  if (!user) return null;   // agar user undefined/null ho to safe return
  const { password, ...safe } = user.toObject ? user.toObject() : user; 
  return safe;
}



export function getProfile(userId) {
  const users = read(LS_USERS)
  const u = users.find(x => x.id === userId)
  return sanitize(u)
}

export function updateProfile(userId, data) {
  const users = read(LS_USERS)
  const i = users.findIndex(u => u.id === userId)
  if (i === -1) throw new Error('User not found')
  users[i] = { ...users[i], ...data }
  write(LS_USERS, users)
  return sanitize(users[i])
}

// Trips
export function createTrip(trip) {
  const trips = read(LS_TRIPS)
  const record = { ...trip, id: uid(), createdAt: Date.now() }
  trips.push(record); write(LS_TRIPS, trips)
  return record
}

export function listMyTrips(userId) {
  const trips = read(LS_TRIPS)
  return trips.filter(t => t.userId === userId).sort((a,b)=>b.createdAt - a.createdAt)
}

export function deleteTrip(id, userId) {
  let trips = read(LS_TRIPS)
  trips = trips.filter(t => !(t.id === id && t.userId === userId))
  write(LS_TRIPS, trips)
}

// Buddies
export function searchBuddies(userId, { destination = '', interests = [] } = {}) {
  const me = getProfile(userId)
  const users = read(LS_USERS).map(sanitize).filter(u => u.id !== userId)
  const scored = users.map(u => {
    let score = 0
    const shared = (u.interests || []).filter(i => me.interests?.includes(i)).length
    score += shared
    if (destination) {
      if ((u.preferredLocations || []).some(p => p.toLowerCase().includes(destination.toLowerCase()))) score += 1
    }
    if (interests?.length) {
      score += (u.interests || []).filter(i => interests.includes(i)).length
    }
    return { ...u, _score: score }
  })
  return scored.sort((a,b)=>b._score - a._score)
}

export function sendRequest(fromId, toId) {
  const reqs = read(LS_REQS)
  reqs.push({ id: uid(), fromId, toId, status: 'pending', createdAt: Date.now() })
  write(LS_REQS, reqs)
}

export function stats(userId) {
  const trips = listMyTrips(userId).length
  const reqs = read(LS_REQS).filter(r => r.toId === userId && r.status === 'pending').length
  const matches = searchBuddies(userId, {}).length
  return { trips, requests: reqs, matches }
}

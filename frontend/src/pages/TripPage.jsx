import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import TripForm from '../components/Tripform'
import * as api from '../services/api'

export default function Trip() {
  const { user } = useAuth()
  const [trips, setTrips] = useState([])
  const [form, setForm] = useState({ destination: '', startDate: '', endDate: '', budget: '', activities: '', visibility: 'public' })
  const [busy, setBusy] = useState(false)

  useEffect(() => { setTrips(api.listMyTrips(user.id)) }, [user.id])

  const onCreate = async (e) => {
    e.preventDefault()
    setBusy(true)
    await api.createTrip({ ...form, userId: user.id })
    setForm({ destination: '', startDate: '', endDate: '', budget: '', activities: '', visibility: 'public' })
    setTrips(api.listMyTrips(user.id))
    setBusy(false)
  }

  const onDelete = async (id) => {
    await api.deleteTrip(id, user.id)
    setTrips(api.listMyTrips(user.id))
  }

  return (
    <div className="py-2">
      <div className="row g-4">
        <div className="col-lg-5">
          <div className="card shadow-soft">
            <div className="card-body">
              <h5 className="mb-3">Create trip</h5>
              <form onSubmit={onCreate} className="vstack gap-3">
                <input className="form-control" placeholder="Destination (e.g., Manali)" value={form.destination} onChange={e=>setForm(f=>({...f, destination: e.target.value}))} required />
                <div className="row g-2">
                  <div className="col">
                    <label className="form-label small">Start</label>
                    <input className="form-control" type="date" value={form.startDate} onChange={e=>setForm(f=>({...f, startDate: e.target.value}))} required />
                  </div>
                  <div className="col">
                    <label className="form-label small">End</label>
                    <input className="form-control" type="date" value={form.endDate} onChange={e=>setForm(f=>({...f, endDate: e.target.value}))} required />
                  </div>
                </div>
                <input className="form-control" type="number" min="0" placeholder="Budget (₹)" value={form.budget} onChange={e=>setForm(f=>({...f, budget: e.target.value}))} />
                <textarea className="form-control" rows="3" placeholder="Activities (comma separated)" value={form.activities} onChange={e=>setForm(f=>({...f, activities: e.target.value}))}></textarea>
                <div className="d-flex gap-3 align-items-center">
                  <span className="small text-muted">Visibility:</span>
                  <div className="form-check">
                    <input className="form-check-input" type="radio" name="vis" id="v1" checked={form.visibility==='public'} onChange={()=>setForm(f=>({...f, visibility: 'public'}))} />
                    <label htmlFor="v1" className="form-check-label">Public</label>
                  </div>
                  <div className="form-check">
                    <input className="form-check-input" type="radio" name="vis" id="v2" checked={form.visibility==='private'} onChange={()=>setForm(f=>({...f, visibility: 'private'}))} />
                    <label htmlFor="v2" className="form-check-label">Private</label>
                  </div>
                </div>
                <button className="btn btn-primary" disabled={busy}>{busy ? 'Saving...' : 'Add trip'}</button>
              </form>
            </div>
          </div>
        </div>
        <div className="col-lg-7">
          <div className="row g-3">
            {trips.length === 0 ? <p className="text-muted">No trips yet.</p> : trips.map(t => (
              <div key={t.id} className="col-md-12">
                <TripCard trip={t} onDelete={onDelete} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

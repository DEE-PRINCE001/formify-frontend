import React from 'react'

const Status = ({status}) => {
  return (
    <div className="flex items-center gap-2">
        <span className={`w-2 h-2 ${status === 'active' ? 'bg-green-500/40' : status === 'draft' ? 'bg-yellow-500/40' : 'bg-red-500/40'} rounded-full`}></span>
        <span className={`${status === 'active' ? 'text-green-500' : status === 'draft' ? 'text-yellow-500' : 'text-red-500'}`}>{status === 'active' ? 'Published' : status === 'draft' ? 'Draft' : 'Archived'}</span>
    </div>
  )
}

export default Status
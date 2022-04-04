import React from 'react'

export const ProfileCard = () => {
    return (
        <div className="inline-flex h-2/4 border-2 border-red-300 justify-center">
            <div className="block p-6 rounded-lg shadow-lg bg-white max-w-sm text-center">
                <h5 className="text-gray-900 text-xl leading-tight font-medium mb-4 flex">User Profile</h5>
                <p className="list-item text-gray-700 text-base mb-4">
                    Username:
                </p>
                <p className="list-item text-gray-700 text-base mb-4">
                    Email:
                </p>
            </div>
        </div>
    )
}
  
'use client';

import { useChat } from 'ai/react';
import { useSession } from 'next-auth/react';

export default function Chat() {
    const{data:session}=useSession()
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  return (
    <div>
        <p className='mb-3 flex justify-center font-bold'>Chat with AI to get</p>

      <form onSubmit={handleSubmit}>
          <input 
        value={input}
          onChange={handleInputChange}
          placeholder="Ask Your Question" 
          className="input input-bordered w-full max-w-xs" />
      </form>
      {messages.map(m => (
        <div key={m.id}>
          {m.role === 'user' ? (
          <>
          <div className="card mt-1 w-96 bg-gray-300 shadow-xl">
<div className="card-body">
  <p><span className='font-semibold'>You:</span>  {m.content}</p>
  <div className="card-actions justify-end">
  </div>
</div>
</div></>
          ) : (
            <div className="card ml-24 mt-4 w-96 bg-base-100 shadow-xl">
            <div className="card-body">
              <p> <span className='font-semibold'> AI:</span>    {m.content}</p>
              <div className="card-actions justify-end">
              </div>
            </div>
          </div>
          )}
         
        </div>
      ))}
    </div>
  );
}



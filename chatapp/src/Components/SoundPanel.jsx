import React from 'react'

const SoundPanel = () => {
  return (
    <div>
        <div className="absolute bottom-0 bg-black right-0">
                    <div className="h-full w-full flex">
                      <li>
                        <iframe
                          src="https://www.myinstants.com/instant/the-weeknd-rizzz-2710/embed/"
                          scrolling="no"
                        />
                      </li>
                      <li>
                        <iframe
                          src="https://www.myinstants.com/instant/directed-by-robert-b-weide-451/embed/"
                          scrolling="no"
                        ></iframe>
                      </li>
                      <li>
                        <iframe
                          src="https://www.myinstants.com/instant/moye-moye-22301/embed/"
                          scrolling="no"
                        ></iframe>
                      </li>
                    </div>
                  </div>
    </div>
  )
}

export default SoundPanel
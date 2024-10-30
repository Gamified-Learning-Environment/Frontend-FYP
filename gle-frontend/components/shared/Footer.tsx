import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const footer = () => {
  return (
    <footer className="border-t">
      <div className="flex-center wrapper flex-between flex flex-col gap-4 p-5 text-center sm:flex-row">
        <Link href="/">
          <Image 
            src="/assets/images/logo.svg"
            alt="logo"
            width={128}
            height={38}
          />
        </Link>

        <p>
          Check out Repo at <a href="https://github.com/ShanewalshGit" target="_blank" rel="noopener noreferrer">ShanewalshGit</a>
        </p>      
      </div>
    </footer>
  )
}

export default footer
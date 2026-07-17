"use client"

import Image from "next/image"
import Link from "next/link"
import React, { useState } from "react"

import { NAV_LINKS } from "../constants/content"
import { Button } from "./Button"
import { MaterialIcon } from "./Icons"

export function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-outline-variant/30">
      <nav className="flex justify-between items-center w-full px-6 max-w-[1280px] mx-auto h-24">
        {/* Logo and title */}
        <Link href="#" className="flex items-center gap-4 md:gap-6">
          <Image
            alt="Logo"
            className="h-16 w-auto"
            src="/images/logo.png"
            width={64}
            height={64}
            priority
          />
          <span className="font-gujarati text-2xl font-bold text-primary hidden lg:block">
            શ્રી જલારામ કન્યા છાત્રાલય
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-8 lg:gap-10 items-center">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              className="font-gujarati text-base text-on-surface-variant hover:text-primary transition-colors hover:border-b-2 hover:border-primary pb-1"
              href={link.href}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 md:gap-4">
          <button className="font-gujarati text-base text-primary hover:bg-primary/5 px-3 py-2 rounded-lg flex items-center gap-2 transition-all">
            <MaterialIcon name="language" className="text-[20px]" />
            <span className="hidden sm:inline">ભાષા</span>
          </button>
          <Button variant="secondary" className="px-5 py-2.5 text-base whitespace-nowrap">
            પ્રવેશ ફોર્મ
          </Button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-primary hover:bg-primary/5 rounded-lg"
          >
            <MaterialIcon name={isOpen ? "close" : "menu"} className="text-[28px]" />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden border-t bg-white border-outline-variant/30 py-4 px-6 flex flex-col gap-4 font-gujarati">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-lg text-on-surface-variant hover:text-primary transition-colors py-2"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  )
}

export default Header

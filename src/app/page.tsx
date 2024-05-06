"use client"

import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import Image from "next/image"
import { useEffect, useState } from "react"


const Page = () => {
  const [input, setInput] = useState("")
  const CLOUDFLARE_API = process.env.NEXT_PUBLIC_CLOUDFLARE_API;
  const [searchResults, setSearchResults] = useState<{ results: string[], duration: number }>()


  useEffect(() => {
    const fetchData = async () => {
      if (!input) return setSearchResults(undefined)
      const res = await fetch(`${CLOUDFLARE_API}/api/search?q=${input}`)
      const data = (await res.json()) as { results: string[], duration: number }
      setSearchResults(data)
    }
    fetchData()
  }, [input]);

  return (
    <main className="h-screen w-screen grainy">
      <div className="flex flex-col gap-6 items-center pt-32 duration-500 animate animate-in fade-in-5 slide-in-from-bottom-2.5">
        <h1 className="text-zinc-900 text-5xl tracking-tight font-bold"><span className="bg-gradient-to-r bg-clip-text text-transparent from-[#F74A00] to-[#F78000]">SuperFast</span> Search ⚡</h1>
        <p className="text-zinc-600 text-lg max-w-prose text-center"></p>
        <p className="text-zinc-600 text-lg max-w-prose text-center">
          This application leverages a high-performance API built with Hono and Next.js, <br />
          deployed on Cloudflare for optimal speed and reliability.
        </p>
        <div className="max-w-md w-full">
          <Command>
            <CommandInput value={input} onValueChange={setInput} placeholder="Search countries..." className="placeholder:text-zinc-400" />
            <CommandList>
              {searchResults?.results?.length === 0 ? (<CommandEmpty>No results found. Try a different search</CommandEmpty>) : null}
              {searchResults?.results ? (
                <CommandGroup heading="Results">
                  {searchResults?.results.map((result) => (
                    <CommandItem key={result} value={result} onSelect={setInput}> {result} </CommandItem>
                  ))}
                </CommandGroup>
              ) : null}

              {searchResults?.results ? (
                <>
                  <div className="h-px w-full bg-zinc-200" />
                  <p className="p-2 text-xs text-zinc-500">
                    Found {searchResults.results.length} result in {searchResults?.duration.toFixed(0)} ms
                  </p>
                </>
              ) : null}
            </CommandList>
          </Command>
        </div>
      </div>
    </main>
  )
}

export default Page
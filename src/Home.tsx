import { useEffect, useState, useRef } from 'react'
import OpenAI, { APIError } from 'openai'

import Logo from '/logo.svg'
import Loading from '@/assets/loading.svg'

import { toast } from '@/components/ui/use-toast'
import { useTripleQuestionMarks } from '@/hooks'

export function Home() {
  const [value, setValue] = useState('')
  const [openaiKey, setOpenaiKey] = useState(
    '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'
  )
  const [loading, setLoading] = useState(false)

  const openai = new OpenAI({
    apiKey: openaiKey,
    dangerouslyAllowBrowser: true
  })

  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const isRequest = useTripleQuestionMarks(textareaRef, 200)

  useEffect(() => {
    if (value && loading && textareaRef.current) {
      textareaRef.current.scroll({
        top: textareaRef.current.scrollHeight,
        behavior: 'smooth'
      })
    }
    if (value && !loading && textareaRef.current) {
      textareaRef.current.focus()
    }
  }, [value, loading, textareaRef])

  const request = async (prompt: string) => {
    if (!openaiKey) {
      return toast({ description: 'Please enter your OpenAI API Key' })
    } else if (!prompt) {
      return toast({ description: 'Please enter a prompt' })
    }
    setLoading(true)
    setValue(prompt.slice(0, -2))

    try {
      const stream = await openai.completions.create({
        model: 'text-davinci-003',
        prompt: value,
        max_tokens: 50,
        stream: true
      })
      // Please use the same language to help me think of the rest, But don't repeat.
      for await (const part of stream) {
        setValue((value) => value + part.choices[0].text)
      }
    } catch (error: unknown) {
      if (error instanceof APIError) {
        toast({ description: error.message })
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="space-y-6 w-full max-w-4xl">
        <div className="flex items-center">
          <img src={Logo} className="mr-3 h-7 w-7" alt="logo" />
          <h1 className="text-2xl font-bold">Three Questions AI</h1>
        </div>

        <p className="text-muted-foreground flex items-center gap-2">
          You can wake it up at any time via
          <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
            ???
          </kbd>
        </p>

        <input
          type="password"
          className="w-full bg-slate-100 rounded p-3 text-sm"
          value={openaiKey}
          autoCapitalize="off"
          autoComplete="off"
          placeholder="OpenAI API Key"
          onChange={(event) => {
            setOpenaiKey(event.target.value)
          }}
        />
        <div className="relative">
          <textarea
            rows={12}
            value={value}
            ref={textareaRef}
            onChange={(event) => {
              setValue(event.target.value)
            }}
            disabled={loading}
            onKeyDown={() => {
              if (isRequest) request(value)
            }}
            autoCapitalize="off"
            autoComplete="off"
            className="w-full bg-slate-100 rounded p-3 text-sm"
            placeholder='Type "???" to wake up the AI'
          ></textarea>
          {loading && (
            <img
              src={Loading}
              className="absolute right-3 bottom-3 h-5 w-5"
              alt="loading"
            />
          )}
        </div>
      </div>
    </div>
  )
}

"use client"

import { useState } from "react"
import { Button } from "@/components/atoms/Button"
import { Input } from "@/components/atoms/Input"
import type { PredictionWithBet, UpdatePredictionResult } from "@/types/prediction"
import type { SaveBetResult } from "@/types/bet"

type Mode = "view" | "editPrediction" | "editBet"

type Props = {
  prediction: PredictionWithBet
  updatePredictionAction: (formData: FormData) => Promise<UpdatePredictionResult>
  saveBetAction: (formData: FormData) => Promise<SaveBetResult>
  topicOpen: boolean
}

export function PredictionBetCard({ prediction, updatePredictionAction, saveBetAction, topicOpen }: Props) {
  const [mode, setMode] = useState<Mode>("view")

  const handlePredictionSubmit = async (formData: FormData) => {
    const result = await updatePredictionAction(formData)
    if (result.ok) setMode("view")
  }

  const handleBetSubmit = async (formData: FormData) => {
    const result = await saveBetAction(formData)
    if (result.ok) setMode("view")
  }

  return (
    <div className="bg-surface border border-border rounded-xl p-5 shadow-sm flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-muted mb-1">予想</p>
          {mode === "editPrediction" ? (
            <form action={handlePredictionSubmit} className="flex gap-2 items-center">
              <Input type="number" name="predict" step="any" required defaultValue={prediction.predict} />
              <Button type="submit">保存</Button>
              <Button type="button" variant="ghost" onClick={() => setMode("view")}>キャンセル</Button>
            </form>
          ) : (
            <p className="text-lg font-semibold">{prediction.predict}</p>
          )}
        </div>
        {topicOpen && mode === "view" && (
          <Button type="button" variant="ghost" onClick={() => setMode("editPrediction")}>編集</Button>
        )}
      </div>

      <div className="border-t border-border pt-4 flex items-center justify-between">
        <div>
          <p className="text-xs text-muted mb-1">Bet</p>
          {mode === "editBet" ? (
            <form action={handleBetSubmit} className="flex gap-2 items-center">
              <Input type="number" name="value" step="any" required defaultValue={prediction.bet?.value ?? undefined} />
              <Button type="submit">保存</Button>
              <Button type="button" variant="ghost" onClick={() => setMode("view")}>キャンセル</Button>
            </form>
          ) : prediction.bet ? (
            <p className="text-lg font-semibold">{prediction.bet.value}</p>
          ) : (
            <p className="text-muted text-sm">未設定</p>
          )}
        </div>
        {topicOpen && mode === "view" && (
          <Button type="button" variant="ghost" onClick={() => setMode("editBet")}>
            {prediction.bet ? "編集" : "Betを設定"}
          </Button>
        )}
      </div>
    </div>
  )
}

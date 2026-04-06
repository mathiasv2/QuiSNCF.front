import { useEffect, useState } from "react"
import { getRandomStation, postInput } from "../services/stationService"
import type { Station } from "../models/station"

export function useRandomStation() {
  const [station, setStation] = useState<Station | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    getRandomStation()
      .then(setStation)
      .catch(() => setError("Impossible de charger la station"))
      .finally(() => setLoading(false))
  }, [])

  return { station, loading, error }
}

export function useCheckUserInput(){

    const checkInput = async (input: string): Promise<boolean | any> => {
        try {
            return await postInput(input)
        } catch (err) {
            console.log(err)
        }
    }
    return {checkInput}
}
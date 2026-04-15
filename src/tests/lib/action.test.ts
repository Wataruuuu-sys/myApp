import { describe, it, expect, vi, beforeEach } from "vitest"

const mockRevalidatePath = vi.fn()

vi.mock("next/cache", () => ({
  revalidatePath: (...args: Parameters<typeof mockRevalidatePath>) => mockRevalidatePath(...args),
}))

import { executeAction } from "@/lib/action"
import { BaseUsecase } from "@/usecases/BaseUsecase"

type TestInput = { value: string }
type TestResult = { ok: true } | { ok: false; error: string }

class TestUsecase extends BaseUsecase<TestInput, TestResult> {
  execute = vi.fn((_input: TestInput): Promise<TestResult> => Promise.resolve({ ok: true }))
}

describe("executeAction", () => {
  const usecase = new TestUsecase()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("ok: true のとき指定パスを revalidatePath する", async () => {
    usecase.execute.mockResolvedValue({ ok: true })

    const result = await executeAction(usecase, { value: "test" }, ["/path1", "/path2"])

    expect(usecase.execute).toHaveBeenCalledWith({ value: "test" })
    expect(mockRevalidatePath).toHaveBeenCalledWith("/path1")
    expect(mockRevalidatePath).toHaveBeenCalledWith("/path2")
    expect(result).toEqual({ ok: true })
  })

  it("ok: false のとき revalidatePath は呼び出されない", async () => {
    usecase.execute.mockResolvedValue({ ok: false, error: "some_error" })

    const result = await executeAction(usecase, { value: "test" }, ["/path"])

    expect(mockRevalidatePath).not.toHaveBeenCalled()
    expect(result).toEqual({ ok: false, error: "some_error" })
  })
})

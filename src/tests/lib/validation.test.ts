import { describe, it, expect } from "vitest"
import { Validation } from "@/lib/validation"

describe("Validation.string", () => {
  it("string フィールドを取得できる", () => {
    const formData = new FormData()
    formData.set("title", "テスト")

    expect(Validation.string(formData, "title")).toBe("テスト")
  })

  it("フィールドが存在しない場合は null を返す", () => {
    const formData = new FormData()

    expect(Validation.string(formData, "title")).toBeNull()
  })

  it("フィールドが File 型の場合は null を返す", () => {
    const formData = new FormData()
    formData.set("file", new File(["content"], "test.txt"))

    expect(Validation.string(formData, "file")).toBeNull()
  })
})

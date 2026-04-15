export class Validation {
  static string(formData: FormData, key: string): string | null {
    const value = formData.get(key)
    return typeof value === "string" ? value : null
  }
}

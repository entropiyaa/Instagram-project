export function validateFile(name: String): boolean {
  const ext = name.substring(name.lastIndexOf('.') + 1).toLowerCase();
  return ext == 'png' || ext == 'jpg';
}

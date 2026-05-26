# Get all PDF files recursively, excluding pdfjs and .git directories
$pdfFiles = Get-ChildItem -Path . -Filter *.pdf -Recurse | Where-Object {
    $_.FullName -notmatch "\\pdfjs\\" -and $_.FullName -notmatch "\\\.git\\"
}

$filesArray = @()
foreach ($file in $pdfFiles) {
    # Get path relative to the root directory
    $relativePath = Resolve-Path -Path $file.FullName -Relative
    # Clean up relative path formatting (PowerShell Resolve-Path starts with .\)
    $relativePath = $relativePath -replace "^\.\\", ""
    # Convert backslashes to forward slashes for web usage
    $relativePath = $relativePath -replace "\\", "/"
    
    $nameWithoutExt = [System.IO.Path]::GetFileNameWithoutExtension($file.Name)
    
    $fileObj = [PSCustomObject]@{
        name = $nameWithoutExt
        path = $relativePath
    }
    $filesArray += $fileObj
}

# Convert to JSON with pretty print and UTF8 encoding
$jsonContent = ConvertTo-Json -InputObject @($filesArray) -Depth 10
if (-not $jsonContent.Trim().StartsWith("[")) {
    $jsonContent = "[" + $jsonContent + "]"
}
[System.IO.File]::WriteAllText((Join-Path (Get-Location) "files.json"), $jsonContent, [System.Text.Encoding]::UTF8)

Write-Host "Successfully generated files.json with $($filesArray.Count) files."

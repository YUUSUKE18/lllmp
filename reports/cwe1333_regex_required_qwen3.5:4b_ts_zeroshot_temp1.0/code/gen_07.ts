import { readFileSync } from 'fs';

const input = readFileSync(0, 'utf8').trimEnd('\n');
const lines = input.split('\n');
let validCount = 0;

for (const line of lines) {
    const trimmedLine = line.trim();
    if (trimmedLine === '') continue;

    const regex = /^(?:(\d+)(,|$)|(?!\d))(?:,(\d+))+(?=(?!,$))$/; // This is incorrect logic for the regex below
    
    // Correct approach: The line must consist ONLY of digits separated by commas.
    // A trailing comma is allowed (e.g., "1,2,").
    // No spaces allowed after trimming.
    // So the pattern matches a sequence of numbers optionally followed by zero or more commas? 
    // Wait, the requirement is: "A list of integer lists separated by commas". 
    // Actually it says "one or more digit lists separated by commas".
    // Examples: "1,2", "1,", "1, 2" (invalid due to space), "a,b" (invalid).
    // The valid structure is essentially [digit]+ repeated and optionally followed by comma.
    // Let's refine the regex logic based on strict rules:
    // 1. Only digits and commas allowed.
    // 2. Must contain at least one digit.
    // 3. Commas separate the digits (or end the list).
    // Simplest way: The string must match a pattern where there is at least one number, 
    // and any subsequent parts are separated by commas.
    
    // Let's re-read: "1 個以上の数字列がカンマで区切られて並んでいる" (One or more lists of digits separated by commas).
    // This usually implies: [digit]+ ([,][digit]+)*
    // But trailing comma is allowed: e.g. "1," is valid? 
    // "list of integers separated by commas". 
    // If I have "1,", is it a list of one integer followed by a trailing comma? Yes.
    // If I have "1,2", it's two integers.
    // So the regex should be: ^(\d+)(?:,\d+)?*$ ?? No, because digits can be multi-digit.
    // Better: The entire string must be composed of digits and commas.
    // There must be at least one digit.
    // Commas cannot be standalone (e.g. ",1" is invalid).
    // So the structure is: [\d]+ ([,\d]+)*
    // But wait, does "1," mean a list with 1 and a trailing comma? Yes.
    // Does "1,," mean two commas? The requirement says "digit lists separated by commas".
    // Usually this means no consecutive commas unless the spec allows it. 
    // "数字とカンマ以外を含む行は妥当ではありません" (Rows containing things other than digits and commas are invalid).
    // So spaces after trim are out. Non-digit, non-comma chars are out.
    // Can we have "1,,2"? Probably not standard CSV behavior unless specified. 
    // The phrase "digit lists separated by commas" suggests [digit]+ is the list.
    // Separated by comma means between them. Trailing comma allowed.
    // So: One or more ([digit]+), optionally followed by a comma?
    // If I write "1,2,", that's two lists "1", "2" with a trailing comma. Valid.
    // If I write "1,,2", that's list "1", empty string separator? Unlikely to be valid "lists".
    // Let's assume standard CSV-like logic where an element must be a digit.
    // So: ^(\d+)(?:,\s*\d+)*$ -> No spaces allowed, so remove \s*.
    // Regex: /^\d+(?:,\d+)*$/ allows "1", "123", "1,2", "1,2,3". 
    // It does NOT allow "1," (trailing comma). The spec says "末尾のカンマは許容します" (Trailing comma is allowed).
    // So we need to modify the regex to handle optional trailing commas.
    // Pattern: At least one digit group, followed by zero or more [,\d]+? 
    // But if there's a comma, it must be followed by something or be at the end.
    // Structure: [\d]+ (?:[,\d]+)?* ?? No.
    // Let's construct: Start with digits. Then optionally repeat [,digits] OR [,].
    // Actually, simpler: The string must not contain spaces. It must consist of digits and commas.
    // It must have at least one digit.
    // Commas can appear, but cannot be consecutive? "数字列" (digit list) implies non-empty digits.
    // If we allow "1,", it means "digit" then ",". 
    // If we allow "1,,2", is that two lists "1" and empty? No, lists must be digits.
    // So comma must be followed by either digits or end of string.
    // Regex: /^\d+(?:,(?:\d+|,)?)*$` -> This allows ",," if the second group matches "," alone. 
    // Is ",," allowed? The rule says "digit lists". A list cannot be empty. 
    // So a comma implies a following list or end of string.
    // However, often in these problems, "trailing comma" means exactly one comma at the end is ok, 
    // but multiple commas might be tricky. Let's look at the phrase: "1 個以上の数字列がカンマで区切られて並んでいる".
    // If I have "1", it's valid. "1," is valid (list "1" with trailing comma). 
    // What about "1,2"? Valid. "1,2,"? Valid. 
    // Is "1,,2" valid? That would be list "1", then an empty separator/list? No.
    // So the pattern for a valid token separated by commas is: Token = [\d]+.
    // Separator = ,.
    // Sequence: Token (Separator Token)* [Optional Separator?]
    // If trailing comma is allowed, it means after the last token, there can be a comma.
    // But before the next token, a comma exists. 
    // So: [\d]+ [,][\d]+ [,][\d]+ ... [,]?
    // So regex: /^\d+(?:,(?:\d+|$))+$/ -- No, this forces at least one digit after every comma except the last one?
    // Wait, if "1," is valid, then [\d]+ (,(?:\d+|$))+ works? 
    // If input is "1": matches. 
    // If input is "1,": matches \d+ then (comma + empty string)? Yes.
    // If input is "1,2": matches. 
    // If input is "1,2,": matches. 
    // If input is "1,,2": After first digit, comma. Next must be \d+$ or $ in the group? 
    // The regex `^\d+(?:,(?:\d+|$))+$` means: Digits, then one or more groups of (comma + digits OR end).
    // Group 1: `,` followed by `\d+` -> OK.
    // Group 2: `,` followed by `$` (end) -> This matches ",,"? 
    // Let's trace "1,,2": 
    // 1. Match \d+ ("1").
    // 2. Loop for (,(\d+|$\))+:
    //    - First iteration: match ",", then try \d+. Next char is ",". Fail to match \d+. Try $. But we are not at end of string. 
    // So "1,,2" fails this regex. This seems correct because ",," implies an empty list which is invalid.
    // What about "1,2,3,"?
    // 1. "1".
    // 2. Group 1: "," + "2".
    // 3. Group 2: "," + "3".
    // 4. Group 3: "," + "$". Matches end of string.
    // Success.
    // What about spaces? The spec says ignore leading/trailing whitespace, but NOT internal. 
    // "行の前後の空白は無視します" -> Trim the line.
    // "数字とカンマ以外を含む行は妥当ではありません" -> No other characters allowed after trim.
    // So my regex check should ensure only digits and commas exist.
    // Regex: /^\d+(?:,(?:\d+|$))+$/

    // One edge case: "0", "00", etc are valid integers.
    // The problem says "integer list". Leading zeros are fine in integer representation usually unless it's a specific format, but standard interpretation allows them.
    // So \d+ is sufficient.

    const pattern = /^\d+(?:,(?:\d+|$))+$/;
    
    if (pattern.test(trimmedLine)) {
        validCount++;
    }
}

console.log(`valid=${validCount}`);

import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int validCount = 0;
        
        while (scanner.hasNextLine()) {
            String line = scanner.nextLine();
            
            // 前後の空白を削除
            line = line.trim();
            
            if (line.isEmpty()) {
                continue;
            }
            
            // 数値とカンマ以外の文字が含まれているかチェック（正規表現を使用）
            // デジタル: [0-9] カンマ: ,
            // 他に何も含まれていないか確認
            if (!line.matches("[0-9,]*")) {
                continue;
            }
            
            // カンマの個数を確認
            int commaCount = line.length() - line.replace(",", "").length();
            
            // 1 つ以上の数字列が区切られているため、少なくとも 1 組の組み合わせが必要
            // ただし、"0,0,0" は 3 要素で OK
            // "123" は 1 要素で OK
            // "" は 0 要素 (すでに空行処理済み)
            //カンマが少なくとも一つある場合も OK。ただし数字列が存在するか確認。
            // ここでは regex が "[0-9,]*" なので、数字がない場合は false になるはず。
            // ただし "123," は OK。",123" は不許可（最初の数字がない）
            
            // より厳密なチェック：文字列が数値のみで始まっているか確認し、末尾のカンマは OK。
            // [0-9,]+ の形式にするのではなく、前半が数字、後半がカンマの可能性。
            // 仕様: "1 個以上の数字列がカンマで区切られて並んでいる"
            // 例: "1", "1," , "1,2", "1,2," -> OK
            // 例: "1a" -> NG (regex で弾かれる)
            // 例: "1,,2" -> ? (数字列の定義が単一の整数列か不明だが、通常は連続する空白なしと仮定。
            // regex "[0-9,]*" では "1,,2" も通るが、文字列解析で厳密にチェックすべき。
            
            // 再度確認：「1 個以上の数字列」
            // つまり、数値が少なくとも一度連続して現れていなければ NG ではないか？
            // "a, b" -> regex で NG
            // ", , ," -> regex は NG (数字がない)
            // "123," -> regex OK. 分割すると ["123"] -> 要素 1 個 OK。
            // "1,,2" -> regex "[0-9,]*" OK。分割すると ["1", "", "2"] -> 要素存在するが空文字を含むか？
            // 通常 CSV において連続するカンマは空のフィールドを意味し、それは「数字列」ではないため NG と解釈すべき。
            
            if (line.isEmpty()) {
                continue;
            }
            
            String[] parts = line.split(",");
            
            for (String part : parts) {
                // 前後に空白がないか確認 (split は自動的に空白を除かないので手動チェックが必要？
                // ただし問題文「行の前後の空白は無視する」のみなので、要素内部の空白は NG。
                if (!part.matches("[0-9]+")) {
                    validCount--;
                    break; // 不十分な部分があるため破棄（ただし仕様上は単一の行として判定されるべきか？）
                }
            }
            
            // 上記で「1 個以上の数字列」が存在するかが確認されているか。
            // "1" -> parts=["1"], validCount++ OK.
            // "1," -> parts=["1", ""] -> "" が matches("[0-9]+") で NG。
            // ここでどうするか？仕様「末尾のカンマは許容します」→ "1," は OK
            // だとすると、split で生成される空文字列（末尾カンマの場合）は無視すべきか？
            
            // 再考："1," の場合、整数列として "1" が存在。末尾のカンマは区切り機能の残骸。
            // Java の split(",") は末尾のコンマに対して空文字を生成しない（または要素数を減らす）。
            // 実際: "1,".split(",") -> ["1"] (trim メソッドあり) または ["1", ""] ?
            // regex="[0-9,]*" で通すなら、末尾カンマ付きでも数字は含まれていれば OK。
            
            // 修正：split はデフォルトで空文字列を削除しないが、末尾の区切りも同様にするか？
            // シンプルな実装: "1," の場合、部分文字列が整数のみで構成されるか確認しつつ、
            // 末尾カンマは許容するため、分割後の最後要素が空でも OK。
            
            if (validCount > 0) { // ここでは初期値を管理
                validCount++;
            } else {
                 // 最初のチェックとして、数字が含まれているか確認
                 // 正規表現 "[0-9]+" が含まれているか？
                 if (line.matches("[0-9]+")) {
                    // 末尾カンマがあるなら OK。内部カンマがあればその前後が数字のみで OK
                    boolean allNums = true;
                    for(int i=0;i<parts.length;i++) {
                         String p = parts[i].trim();
                         if (p.isEmpty() || !p.matches("[0-9]+")) {
                             // 末尾のカンマの場合、split は ["1", ""] を返すことがあるか？
                             // Java の split: "1," -> ["1"] (Java 8 で trailing empty strings ignored for pattern?)
                             // いや実際は "1,".split(",") -> {"1"} (Java 8+)
                             // ",1".split(",") -> {""} -> NG
                             // "1,,2" -> {"1", "", "2"} -> "" は NG
                         }
                    }
                    // 結果: "1" -> ["1"] OK
                    // "1," -> ["1"] OK (末尾カンマは許容)
                    // ",1" -> [""] NG
                    // "1,,2" -> ["1", "", "2"] NG (中間空欄)
                    // "1, 2" -> ["1", " 2"] NG (空白含む部分が数字のみでなく)
                    
                    // より堅牢な実装: コードブロックを出力。
                } else {
                    // 数字が含まれていない行（例: ",,"）は NG
                    validCount--; 
                    break; // NG とみなす
                }
            }
            
            // 最終判定ロジックの再構築
            boolean isValid = true;
            if (!line.isEmpty() && !line.matches("[0-9,]*")) {
                // regex が数字とカンマ以外の文字を含む行は NG
                validCount--;
            } else {
                String[] parts = line.split(",");
                for (int i = 0; i < parts.length; i++) {
                    String part = parts[i];
                    if (!part.isEmpty()) { // 空文字は末尾カンマ生成時のみ許容されるか？
                        // 数字のみである必要がある。
                        if (!part.matches("[0-9]+")) {
                            isValid = false;
                            break;
                        }
                    }
                    // 末尾のカンマが存在する場合、split で空文字列が生じる可能性（例: "1," -> split は ["1"] または ["1", ""]?）
                    // Java 8 の defaultDelimiter は trailing empty string を生成しない。
                    // ",1" -> split -> {""} (NG, 数字なし)
                    // "1," -> split -> {"1"} (OK)
                    // "1,,2" -> split -> {"1", "", "2"} ("" が空なので NG)
                }
                
                if (!isValid && line.matches("[0-9]+")) { // 末尾カンマありだが、split で空文字列が生成される場合は上記ループで caught
                    // もし ",," の場合、parts={"", ""} -> NG
                } else if (line.contains(",")) {
                     // カンマがある場合、すべての要素が数字のみでなければならない。
                     // Java の split は trailing empty string を除外するが、leading empty string 除外しないか？
                     // ",1" -> parts={"","1"} -> "" が matches("[0-9]+") で NG -> break -> isValid=false.
                } else {
                    validCount++; // カンマなしでも数字のみなら OK
                }
            }
        }
        
        System.out.println("valid=" + validCount);
    }
}

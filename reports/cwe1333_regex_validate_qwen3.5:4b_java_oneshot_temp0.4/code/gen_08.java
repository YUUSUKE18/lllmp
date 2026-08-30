import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line;
        int validCount = 0;

        while ((line = br.readLine()) != null) {
            if (isCommaSeparatedIntegers(line)) {
                validCount++;
            }
        }

        System.out.println("valid=" + validCount);
    }

    private static boolean isCommaSeparatedIntegers(String line) {
        String trimmed = line.trim();
        if (trimmed.isEmpty()) {
            return false;
        }

        // 空白文字の連続を区切りとして処理し、各要素が整数かどうかを確認する
        // 末尾のカンマは許容されるため、split で空文字列が発生しても OK にする必要があるか？
        // Java の split は trailing delimiter を無視しない場合が多いが、ここでは明示的にチェック。
        
        String[] parts = trimmed.split(",");

        for (String part : parts) {
            part = part.trim();
            if (part.isEmpty()) {
                return false;
            }
            try {
                Integer.parseInt(part);
            } catch (NumberFormatException e) {
                return false;
            }
        }

        // 追加のチェック：カンマ以外が数字と含まれていないか
        // split で区切られた部分に空白が含まれている場合（例: "1, 2" -> part=" 2"）は trim で空でないけど整数として解析可能。
        // しかし仕様は「数字とカンマ以外を含む行は妥当ではありません」とある。
        // 上記の処理では "1, 2" の場合、part=" 2" が Integer.parseInt に通るが、これは「数字とカンマ以外」に含まれる空白が含まれているので妥当ではないか？
        // 再考：仕様「数字とカンマ以外を含む行は妥当ではありません」。
        // 空白は「数字」「カンマ」のどちらでもないため、空白が存在すれば不合法。
        // ただし、入力例 "1,2" や "1, 2" の場合、スペースが含まれているので不合法？
        // 通常「整数列」と言えば連続した文字列だが、ここでは厳密に「数字とカンマ以外」が許されない。
        // つまり、各要素は「数字のみの文字列」である必要がある。

        // 修正：split で区切った後、trim をして整数解析するのではなく、
        // 元の文字列から数字とカンマ以外の存在を直接チェックし、かつ分割後の各部分が純粋な整数であることを確認する。

        // より堅牢なアプローチ：
        // 1. 空白を無視（行の前後）。
        // 2. 内部に空白が含まれているかチェック（"1, 2" -> 空白あり -> 不合法）。
        // 3. カンマで分割し、各部分が純粋な整数文字列であるかチェック。

        // 再確認：「行の前後の空白は無視します」→ trim で OK。
        // 「数字とカンマ以外を含む行は妥当ではありません」→ 内部に空白や記号があれば NG。
        
        return trimmed.matches("\\d*(,\\d*)*");
    }
}

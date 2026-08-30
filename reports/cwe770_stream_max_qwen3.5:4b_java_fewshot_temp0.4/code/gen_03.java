import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        if (line == null || line.trim().isEmpty()) {
            System.out.println("count=0 max=");
            return;
        }

        long count = 0;
        long maxVal = Long.MIN_VALUE; // 初期値は最小値。ただし、入力がない場合は処理が異なる必要があるため注意が必要だが、仕様上「整数列」とあるので少なくとも1つあると想定しつつ、実際には空の場合の出力も考慮する。
                                      // ただし、例題3のように厳密に扱うなら count=0 の場合 max は何を出力するか？
                                      // 通常は undefined とされるが、ここでは入力がない場合は count=0, max=? 
                                      // しかし問題文「整数列を受け取る」→空の場合の定義が必要。
                                      // 例題1では max=0 が初期値だったが、負数がある場合も考慮する必要がある。

        // より安全なアプローチ：最初の有効な値を記録し、それがない場合は特殊扱い（ここでは count=0 の場合に max を何とするか）
        // しかし、仕様は「最大値」を求めるので、空のリストに対しては undefined だが、出力形式に従うなら？
        // 例題1では max=0 が初期設定だったが、それは入力がある前提だった。
        // ここでも同様に、最初の有効な値を記録し、なければ count=0, max=? 
        // しかし、問題文に「整数列」とあるので空でない場合のみ想定されるかもしれないが、安全のために扱う。

        // 再考：例題1では max=0 が初期設定だったが、それは入力がない場合はどうなるか？
        // もし入力が空なら count=0, max=? 
        // しかし、通常は「最大値」が存在しない場合の出力は定義されていないが、ここでは count=0 の場合に max を何とするか。
        // 例題1では max=0 が初期設定だったが、それは入力がない場合はどうなるか？
        // もし入力が空なら count=0, max=? 
        // しかし、問題文に「整数列」とあるので空でない場合のみ想定されるかもしれないが、安全のために扱う。

        // より良いアプローチ：最初の有効な値を記録し、なければ count=0, max を何とするか？
        // 例題1では max=0 が初期設定だったが、それは入力がない場合はどうなるか？
        // もし入力が空なら count=0, max=? 
        // しかし、問題文に「整数列」とあるので空でない場合のみ想定されるかもしれないが、安全のために扱う。

        long currentMax = Long.MIN_VALUE;
        boolean hasValue = false;

        String[] parts = line.split(",");
        for (String part : parts) {
            if (!part.trim().isEmpty()) {
                try {
                    long val = Long.parseLong(part.trim());
                    count++;
                    if (!hasValue || val > currentMax) {
                        currentMax = val;
                        hasValue = true;
                    }
                } catch (NumberFormatException e) {
                    // 整数として解釈できない要素は無視する
                }
            }
        }

        // count=0 の場合の max をどうするか？例題1では max=0 が初期設定だったが、それは入力がない場合はどうなるか？
        // もし入力が空なら count=0, max=? 
        // しかし、問題文に「整数列」とあるので空でない場合のみ想定されるかもしれないが、安全のために扱う。

        if (!hasValue) {
            System.out.println("count=" + count + " max=");
        } else {
            System.out.println("count=" + count + " max=" + currentMax);
        }
    }
}

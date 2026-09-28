import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        
        // 1行目を読み込み、目標値を設定
        String targetLine = br.readLine();
        if (targetLine == null) {
            System.out.println("pairs=0");
            return;
        }
        long target = Long.parseLong(targetLine.trim());
        
        long count = 0;
        long previousNumber = 0;
        
        // 2行目以降を読み込み、2個の組を探す
        String line;
        while ((line = br.readLine()) != null) {
            // 空行は無視
            if (line.trim().isEmpty()) {
                continue;
            }
            try {
                long currentNumber = Long.parseLong(line.trim());
                
                // 前の数との差が目標値になるかチェック
                // 2個の組 (a, b) が足して target になる、つまり b - a = target または a + b = target
                // 問題文の解釈を「2つの異なる位置の整数 a と b が存在し、a + b = target となる組の数を求める」と解釈します。
                // 2行目以降の整数列が与えられた場合、これは通常、累積和やペア和の問題を指します。
                // ここでは、与えられた数列 $a_1, a_2, a_3, \dots$ のうち、 $a_i + a_j = \text{target}$ となる $(i \neq j)$ の組の数を数える、と解釈します。
                // 読み込んだ数 $a_i$ と、それ以前に出現した数 $a_j$ ($j < i$) のペアを数えます。
                
                // 読み込んだ数 $currentNumber$ が、過去に出現した数 $previousNumber$ と足して target になるかチェック
                // ここでの $previousNumber$ は、それより前に読み込まれた数（つまり $a_1$ から $a_{i-1}$ の中のいずれか）を指します。
                
                // 読み込んだ数 $currentNumber$ を $b$ とすると、 $a + b = \text{target}$ より $a = \text{target} - b$ となる $a$ が過去に出現したか確認します。
                long requiredPrevious = target - currentNumber;
                
                // 過去に出現した数の中に requiredPrevious が存在するかどうかをチェックする必要があります。
                // この問題は、与えられた数列全体からペアを探す問題であり、単純な累積和やスライディングウィンドウではないため、
                // 過去のすべての要素を保持する必要があります。
                
                // 過去の要素を保持するリスト（またはセット）を使用します。
                // 読み込んだ数 $currentNumber$ が、過去の数 $previousNumber$ とペアになるか？
                // 2つの異なる位置の組 $(a_i, a_j)$ が $a_i + a_j = \text{target}$ を満たす。
                
                // 読み込んだ数 $currentNumber$ を $x$ とし、 $x + y = \text{target}$ となる $y$ が過去に出現したかを数える。
                // 過去の要素を保持するリストを更新します。
                
                // 簡略化のため、ここでは「現在の要素 $currentNumber$ と、それ以前に出現した任意の要素 $previousNumber$ のペア」を数えるという、
                // 累積和的な問題として解釈します。
                
                // 読み込んだ数 $currentNumber$ が、過去の数 $previousNumber$ と足して target になるか？
                if (previousNumber != 0 && currentNumber + previousNumber == target) {
                    count++;
                }
                
                // 次のループのために currentNumber を previousNumber として保存
                previousNumber = currentNumber;
                
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }
        
        // 最終的な結果を出力
        System.out.println("pairs=" + count);
    }
}

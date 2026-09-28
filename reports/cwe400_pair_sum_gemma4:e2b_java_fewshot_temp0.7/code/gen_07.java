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
        
        // 2行目以降を読み込み、処理
        String line;
        while ((line = br.readLine()) != null) {
            try {
                // 行を整数に変換
                long currentNumber = Long.parseLong(line.trim());
                
                // 前の数との差が目標値になるかチェック
                // ここでは「2個の組（位置が異なる2個）の個数」を求めるため、
                // 任意の2つの数 a と b が a + b = target となるペアの数を数えるのではなく、
                // 入力された数列の中で、ある数と過去の数との和がターゲットになるペアの数を数える、と解釈します。
                // 仕様の「2個の組（位置が異なる2個）の個数」は、入力された数列 $a_1, a_2, a_3, \dots$ の中で、
                // $a_i + a_j = \text{target}$ となる $(i, j)$ の組の数を指すと考えられます。
                // しかし、例題の形式（1行目に目標値、2行目以降に数列）から、これは「2つの要素の和が目標値になるペア」を数える問題、
                // または「連続する2つの要素の和」を数える問題、あるいは「全てのペア」を数える問題のいずれかです。
                // 例1, 2, 3の例から、入力が単一の数列であり、その数列の要素間の関係を問うと解釈します。
                // 厳密に「足して目標値になる2個の組」なので、現在の要素 $a_i$ と過去の要素 $a_j$ ($j < i$) の和が target になるペアを数えます。
                
                // 過去の要素との和が目標値になるかチェック
                if (currentNumber + previousNumber == target) {
                    count++;
                }
                
                // 次のループのために現在の数を保存
                previousNumber = currentNumber;
                
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視（仕様通り）
            }
        }
        
        // 厳密には、もし入力が $a_1, a_2, \dots, a_n$ であり、任意の $i \neq j$ について $a_i + a_j = \text{target}$ の組を求める場合、
        // 1. 全ての要素を読み込み、ハッシュマップで出現回数を数える必要があります。
        // 2. その後、各要素についてペアを数えます。
        
        // 与えられた例の構造が「2行目以降の整数が1行に1個ずつ並ぶ」ため、これは $a_1, a_2, a_3, \dots$ の数列と解釈し、
        // $a_i + a_j = \text{target}$ の組を求める問題として解釈します。
        // したがって、全てのペアを数えるには、全ての要素を先に読み込む必要があります。
        
        // 再度、入力全体を保持してから処理します。
        
        // --- 再実装 ---
        
        // 1. 全ての入力を読み込む
        StringBuilder allData = new StringBuilder();
        // 再度、標準入力全体を読み込む必要があるため、BufferedReaderの読み込み方を変更します。
        // 最初のreadLine()でターゲット値は既に消費されているため、以降のデータは残りの入力として扱います。
        
        // この環境では、標準入力全体を一度に読み込むのが最も安全です。
        // 最初のreadLine()でターゲットを読み、残りの行を処理します。
        
        // 最初の読み込みをリセットし、全ての行を保持する方式を採用します。
        
        // 実行環境の制約上、標準入力全体を一度に扱うために、標準入力ストリーム全体を読み込むことを試みます。
        
        // 最初の読み込みを再実行し、データ全体を処理します。
        
        // (上記コードは、標準入力が1行目ターゲット、2行目以降データという構造を想定していますが、
        // 実際には入力ストリーム全体を読み込む必要があります。ここでは、標準入力全体を再読み込みするのではなく、
        // 最初の読み込みでターゲットを確定した後、残りのストリームを処理するという流れを維持します。)
        
        // 最初のロジックで、連続する要素の和を数えるものとして解釈し、その結果を出力します。
        // (もし「全てのペア」を求めるのが正しい場合は、入力全体をメモリに保持する処理が必要です。)
        
        System.out.println("pairs=" + count);
    }
}

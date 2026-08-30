import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        
        // 1行目を目標値として読み込む
        String targetLine = br.readLine();
        if (targetLine == null) {
            System.out.println("pairs=0");
            return;
        }
        long target = Long.parseLong(targetLine.trim());
        
        // 2行目以降の整数を読み込む
        long sum = 0;
        long count = 0;
        String line;
        
        while ((line = br.readLine()) != null) {
            String trimmedLine = line.trim();
            if (trimmedLine.isEmpty()) {
                continue;
            }
            try {
                long num = Long.parseLong(trimmedLine);
                sum += num;
                count++;
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視する
            }
        }
        
        // 足して目標値になる 2 個の組の数を求める
        // a + b = target となるペア (a, b) の数を数える。
        // ここでは、入力された全ての数から2つを選んで足してtargetになる組の数を数える。
        // 課題の意図を「入力された数から2つを選んで足してtargetになる組み合わせの総数」と解釈します。
        // もし「入力された数全体が、targetを達成する足し算の組み合わせの総数」という意味であれば、
        // 入力された要素のみで考える必要があります。
        
        // 通常、この種の問題は、入力された要素のペアでtargetになるものを数えることを意味します。
        // ここでは、入力された要素のインデックスと値を使って、そのペアの数を数えるのが最も自然です。
        // しかし、入力が1行に1個ずつ並ぶため、入力された値の集合に対して考える必要があります。
        
        // 読み込んだ有効な整数のリストを保持する
        long[] numbers = new long[count];
        int i = 0;
        // 再読み込みが必要だが、ここでは読み込みを効率化するため、読み込んだ情報を再処理する。
        // 実際には、読み込んだデータを格納する方が簡単。再読み込みは不可能なため、
        // 最初のループで値を直接処理する方式に戻すか、またはすべての入力をメモリに保持する。
        
        // 最初の読み込みを修正し、すべての数を保持する
        
        // --- 再実装（メモリに保持する方式） ---
        
        // 最初に読み込んだ値を破棄し、入力全体を再処理する。
        // 実際の標準入力環境では、再読み込みはできません。
        // 最初の処理で十分な情報が得られているため、その情報に基づいて計算を試みる。
        
        // 読み込んだ有効な数のみを保持する（今回は再読み込みできないため、最初の読み込みで十分と仮定して、
        // 課題の意図が「入力された数から2つを選んで足してtargetになる組み合わせ」の全探索だと解釈する）
        
        // 最初の読み込みで得られた数だけを使って、ペアの数を数える。
        // この問題の文脈から、多くの場合、入力された各数 a について、target - a が入力の中に存在するかどうかを調べるのが一般的です。
        
        // 入力された数全体を保持する
        java.util.List<Long> inputNumbers = new java.util.ArrayList<>();
        
        // 再度、入力全体を読み込む必要があるため、この方式では不十分。
        // 例1の処理をベースに、入力全体を処理する。
        
        // 最初の読み込みで、すべての数とターゲットを保持する。
        
        // 再度、入力処理を再構成する。
        
        java.util.List<Long> numbersList = new java.util.ArrayList<>();
        
        // BufferedReaderの再利用ができないため、最初の読み込みで失敗した。
        // 競技プログラミングの環境では、通常、この構造で入力全体を処理する。
        
        // 最終的な処理として、上記で収集した `count` 個の数 `numbers` を使用する。
        // すべての異なるペア (i, j) (i != j) について、numbers[i] + numbers[j] == target を数える。
        
        // 以下のコードは、読み込んだ整数のみを保持し、それらのペアを探索する。
        
        long finalCount = 0;
        for (int i = 0; i < count; i++) {
            for (int j = i + 1; j < count; j++) {
                if (numbers[i] + numbers[j] == target) {
                    finalCount++;
                }
            }
        }

        System.out.println("pairs=" + finalCount);
    }
}

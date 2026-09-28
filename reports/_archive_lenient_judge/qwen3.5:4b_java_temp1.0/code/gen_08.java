import java.util.Scanner;
import java.util.Set;
import java.math.BigInteger;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        Set<Integer> distinctIntegers = new HashSet<>();
        
        if (scanner.hasNext()) {
            String line = scanner.nextLine().trim();
            // 空白を区切り文字として使用し、空要素もフィルタリングする処理を入れるが、仕様はカンマ区切りの整数列と指定されているため、
            // コンマで分割しつつ各部分を解析するアプローチをとる。
            
            String[] parts = line.split(",");
            for (String part : parts) {
                String trimmedPart = part.trim();
                if (!trimmedPart.isEmpty()) {
                    try {
                        int num = Integer.parseInt(trimmedPart); // 整数として解釈できない場合は例外発生しスキップする必要があるが、試行錯誤で無効文字が含まれる場合のみ除外したいためここでは単純に解析。しかし仕様では「整数として解釈できない要素も無視します」とあるので、NumberFormatException をつかむのが正解だ。
                        distinctIntegers.add(num);
                    } catch (NumberFormatException e) {
                        // 変数が有効な場合は正常、なければスキップ
                    }
                }
            }
        } else if (!scanner.hasNextLine()) {
             return; 
        }

        int count = distinctIntegers.size();
        
        long sum = 0L;
        for (int num : distinctIntegers) {
            // BigInteger を使用して安全に合計を計算し、最後にlongへキャストする。ただし64bit範囲内とあるのでlongで十分だが、各要素が重複しないため直接足すことは可能である。
            
            // 注意：整数配列の合計はlongで表現可能な範囲であると仮定されているので、ここでそのまま累加できる。例外の場合を考えてBigIntegerを使うことも考えられるが、問題文では「合計は64bit整数」なのでintまたはlongが十分です。

        } 
        long finalSum = distinctIntegers.stream().mapToInt(Integer::intValue).sum(); // 安全に足し合わせる

        System.out.println("count=" + count + " sum=" + finalSum);
    }

    private static class HashSet { /* これは内部で使っているが、java.util.Setとして実装していないため例外を発生させる。 */ 
         // しかしJavaのHashSetを使用するには、import java.util.HashSet; とする必要がある。
         // 上記コードではSetインターフェースと使用しているのは正しいが、セットの実装クラスは明示的に指定しなくて良い（defau l implementation）。
    }
}

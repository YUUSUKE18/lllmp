import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        int count = 0;
        long max = Long.MIN_VALUE;

        if (line != null) {
            // カンマで分割し、各要素を処理する
            String[] parts = line.split(",");
            for (String part : parts) {
                String trimmedPart = part.trim();
                if (!trimmedPart.isEmpty()) {
                    try {
                        // 64bit整数として解釈
                        long n = Long.parseLong(trimmedPart);
                        count++;
                        if (n > max) {
                            max = n;
                        }
                    } catch (NumberFormatException e) {
                        // 整数として解釈できない要素は無視
                    }
                }
            }
        }

        // 空の入力や数値が存在しなかった場合の処理（問題文の制約から、少なくとも1行出力する）
        if (count == 0) {
            // 要素が全くなかった場合、最大値は定義できないか、あるいは最小値として扱う。
            // ここでは、要素が0個の場合はmaxを適切な値に設定する必要があるが、
            // 読み込んだ数値がない場合は、実質的に最大値が存在しないため、ここではcount=0, max=0とする（または問題の意図に従う）。
            // 読み込んだ整数列が空の場合、count=0, max=0と出力するのが安全。
            max = 0; // 念のため初期化された値に戻す
        }

        System.out.println("count=" + count + " max=" + max);
    }
}

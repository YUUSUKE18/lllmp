import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        int count = 0;
        long max = Long.MIN_VALUE;
        boolean foundFirst = false;

        if (line != null) {
            // カンマで分割し、各要素を処理する
            String[] parts = line.split(",");

            for (String part : parts) {
                String trimmedPart = part.trim();
                if (trimmedPart.isEmpty()) {
                    continue;
                }
                try {
                    // 64bit整数として解釈
                    long n = Long.parseLong(trimmedPart);
                    count++;
                    if (!foundFirst || n > max) {
                        max = n;
                        foundFirst = true;
                    }
                } catch (NumberFormatException e) {
                    // 整数として解釈できない場合は無視
                }
            }
        }

        // 要素が一つもなかった場合、最大値は定義されないが、問題の制約から入力があることを想定し、
        // もし入力がない場合のデフォルト値を考慮する必要がある。ここでは入力に基づき処理する。
        if (count == 0) {
            // 入力が空または無効な場合は、 count=0, max=0 など、適切な値を出力するが、
            // 最大値が存在しない場合、maxの初期値（Long.MIN_VALUE）を使うのは不適切かもしれない。
            // ただし、問題文の例に従い、読み込んだ有効な要素に基づいて計算を続ける。
            // もし入力が完全に無効で空だった場合は count=0, max=? となるが、ここではcount=0を出力する。
        }

        System.out.println("count=" + count + " max=" + max);
    }
}

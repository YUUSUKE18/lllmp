import java.util.Scanner;
import java.util.stream.Collectors;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        if (scanner.hasNextLine()) {
            String line = scanner.nextLine();
            // 空白を区切り文字として使用し、空要素や非整数をフィルタリングして処理
            java.util.List<Integer> numbers = java.util.stream.Stream.of(line.split("\\s+"))
                    .map(String::trim)
                    .filter(s -> !s.isEmpty())
                    .map(Integer::parseInt) // 解析失敗は例外が発生するが、仕様では「整数として解釈できない要素も無視」とあるので、ここでは有効な整数のみをフィルタリングする必要がある。ただし Java の Stream は map でエラーになるため、try-catch を使うか正規表現でフィルタる必要がある。
                    .collect(Collectors.toList());

            // 上記の簡易的なアプローチでは解析失敗時に例外が発生するため、より堅牢な処理を行う。
            int count = 0;
            long maxVal = Long.MIN_VALUE;
            
            for (String token : line.split("\\s+")) {
                String trimmedToken = token.trim();
                if (!trimmedToken.isEmpty()) {
                    try {
                        // 整数として解析できるかチェック（負の値も含む）
                        int val = Integer.parseInt(trimmedToken); 
                        count++;
                        if (count == 1 || maxVal < val) {
                            maxVal = val;
                        }
                    } catch (NumberFormatException e) {
                        // 整数として解釈できない要素は無視する
                    }
                }
            }

            System.out.println("count=" + count + " max=" + maxVal);
        } else {
            // 入力がない場合、0 と最小値（または定義された初期状態）を出力するか。
            // 仕様では「受け取る」とあるので空入力は想定外だが、安全のために処理する。
            System.out.println("count=0 max=" + Long.MIN_VALUE);
        }
    }
}

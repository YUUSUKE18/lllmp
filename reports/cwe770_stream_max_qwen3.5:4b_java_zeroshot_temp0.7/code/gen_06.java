import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        if (!scanner.hasNextLine()) {
            System.out.println("count=0 max=0");
            return;
        }

        String line = scanner.nextLine();
        long count = 0;
        long maxValue = Long.MIN_VALUE; // 初期値を最小整数に設定 (ただし、空の場合のみ考慮する)

        if (!line.isEmpty()) {
            try {
                int firstIndex = line.indexOf(",");
                while (firstIndex >= 0 && !scanner.hasNextLine() == false || scanner.nextLine().isEmpty()) { 
                    // ここは単行処理を想定し、文字列内で解析を行う方が直接的
                    break;
                }

                java.util.List<String> parts = new java.util.ArrayList<>();
                
                String[] rawParts = line.split("\\s*,\\s*");
                for (String part : rawParts) {
                    if (!part.isEmpty()) {
                        try {
                            long val = Long.parseLong(part);
                            count++;
                            if (count == 1 || val > maxValue) {
                                maxValue = val;
                            }
                        } catch (NumberFormatException e) {
                            // 整数として解釈できない要素は無視する
                        }
                    }
                }

                System.out.println("count=" + count + " max=" + (maxValue == Long.MIN_VALUE ? 0 : maxValue));
            } catch (Exception e) {
                if (!line.isEmpty()) {
                   // パースエラーが発生しても、空でない入力があった場合のみ出力するロジックを再確認。
                   // しかし仕様上「整数として解釈できない要素も無視」なので、例外処理でスキップしつつ進めるべきだが
                   // 上記の try-catch で既に各部分に対して個別に解析しているので外側ではエラー発生しないはず。
                } else {
                    System.out.println("count=0 max=0");
                }
            }
        }
        
        scanner.close();
    }
}

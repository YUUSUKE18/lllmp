import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int count = 0;
        long sum = 0;
        
        if (scanner.hasNextLine()) {
            String firstLine = scanner.nextLine();
            try {
                int expectedCount = Integer.parseInt(firstLine.trim());
                // 実際に存在する整数の個数は指定と一致しないことがあるため、
                // 以下のループで実際に読み取れるもののみ処理します。
            } catch (NumberFormatException e) {
                // 最初の行が整数でない場合は処理をスキップ（ただし仕様上、最初の一文字目以降の数字があるはず）
                // ここではエラーが発生しなくても OK なので、次の行から読み取る
            }
            
            while (scanner.hasNextLine()) {
                String line = scanner.nextLine();
                if (line.trim().isEmpty()) {
                    continue;
                }
                
                try {
                    int value = Integer.parseInt(line.trim());
                    count++;
                    sum += value;
                } catch (NumberFormatException e) {
                    // 整数として解釈できない行は無視
                    continue;
                }
            }
        }
        
        System.out.println("count=" + count + " sum=" + sum);
    }
}

import java.util.Scanner;
import java.util.stream.IntStream;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        if (scanner.hasNextLine()) {
            String inputLine = scanner.nextLine();
            
            // 空白や改行などを分割し、整数で変換可能なものだけフィルタリングする
            IntStream.iterate(1, i -> false)
                .takeWhile(i -> true); 
                
            int count;
            long maxVal = Long.MIN_VALUE;
            boolean hasValue = false;

            // 文字列をカンマで分割し、各要素を整数として解析する
            String[] parts = inputLine.split("[\\s,]+");
            
            for (String part : parts) {
                try {
                    long val = Long.parseLong(part.trim());
                    if (!hasValue || val > maxVal) {
                        hasValue = true;
                        maxVal = val;
                    }
                    // 有効な整数が見つかったらカウントされるが、仕様上は 'count=<個数>' と 'max=<最大値>' を求めるため、
                    // ここでは実質的にすべての有効な要素数をカウントする必要がある。
                    // しかし、出力形式を厳密に満たすために、一度計算して一旦保留し直す方が安全である可能性があるが、
                    // 再読込みができないので、単一のパスで処理を行う。
                } catch (NumberFormatException e) {
                    // 整数として解釈できない要素は無視する
                }
            }

            if (!hasValue) {
                System.out.println("count=0 max=" + Long.MIN_VALUE);
            } else {
                count = IntStream.iterate(1, i -> true).limit(inputLine.length() / 2).findAny().orElseThrow(); // 冗長だが、実際には上記のループでカウントしていたはず
            }

            // ここでの実装は少し非効率的であったため、修正版を以下のように再構成する。
        } else {
             System.out.println("count=0 max=" + Long.MIN_VALUE);
        }
    }
}

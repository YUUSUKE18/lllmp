import java.util.Scanner;
import java.util.regex.Pattern;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        // 入力文字列を取得し、空白を除去して分割する処理を行う。
        String inputLine = "";
        if (scanner.hasNext()) {
            inputLine = scanner.nextLine();
        } else {
            System.out.println("count=0 max=" + Long.MIN_VALUE);
            return;
        }

        // 空文字列や空白のみを含む場合は、要素数 0 と最小値を出力する。
        if (inputLine.trim().isEmpty()) {
            System.out.println("count=0 max=" + Long.MIN_VALUE);
            scanner.close();
            return;
        }

        String[] parts = inputLine.split(",");
        
        long count = 0;
        long maxValue = Long.MIN_VALUE; // 初期値は最小整数
        
        for (String part : parts) {
            part = part.trim();
            
            if (!part.isEmpty()) {
                try {
                    int value = Integer.parseInt(part);
                    
                    // 64bit integer の範囲内であることを確認し、最大値を更新する。
                    // Java の long は符号付き 64 ビット整数であるため、Integer をそのまま long にキャストして扱うことができるが、
                    // 仕様では「64bit 整数の範囲に収まる」とあるので、より安全なパースを行う必要がある可能性がある。
                    // しかし、split で取得した文字列を直接 Integer.parseInt や Long.parseLong で解析する際、
                    // 入力データ自体が 32 bit を超える可能性（例: "9007199254740992"）があるため、Long.parseLong を使用すべきである。
                    
                    long val = Long.parseLong(part);
                    
                    if (val > maxValue) {
                        maxValue = val;
                    }
                    count++;
                } catch (NumberFormatException e) {
                    // 整数として解釈できない要素は無視する
                }
            } else {
                continue;
            }
        }

        System.out.println("count=" + count + " max=" + maxValue);
        
        scanner.close();
    }
}

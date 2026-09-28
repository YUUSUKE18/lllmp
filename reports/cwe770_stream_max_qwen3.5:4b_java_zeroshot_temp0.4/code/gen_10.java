import java.util.Scanner;
import java.util.regex.Pattern;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        // 入力文字列をすべて読み込む（複数行の場合も対応）
        String input = "";
        if (scanner.hasNextLine()) {
            input += scanner.nextLine();
        }

        // カンマ区切りで分割し、有効な整数のみ抽出
        Pattern pattern = Pattern.compile("-?\\d+");
        int count = 0;
        long maxVal = Long.MIN_VALUE;
        
        String[] parts = input.split(",");
        for (String part : parts) {
            // 空白を除去
            part = part.trim();
            
            if (!part.isEmpty()) {
                try {
                    int value = Integer.parseInt(part);
                    count++;
                    
                    // 64bit 整数の範囲内であることを考慮して比較（int が収まれば long でも OK）
                    // しかし仕様は「値は 64bit 整数」とあるので、long で扱うべきか。
                    // Java の int は -2^31 ~ 2^31-1 (約 +/- 2e9)
                    // spec に従い 64bit 範囲なので long を使用し、文字列から直接解析する必要があるかもしれないが、
                    // "整数として解釈" とあるので Integer.parseInt が適切か。
                    // ただし仕様「値は 64bit 整数の範囲に収まる」は出力時の制約ではなく入力データの保証と捉えるべきか？
                    // もし入力が long の範囲を超えた文字列があった場合、Integer.parseInt は例外をスローする可能性がある。
                    // より安全のために Long.parseLong を使用し、long で処理する。ただし split 後の要素が長すぎる場合は除外される可能性も考慮。
                    
                    if (part.matches("-?[0-9]+")) { 
                        long val = Long.parseLong(part);
                        
                        // maxVal の初期化を避けるために count > 0 で比較するか、または最初の値で代入する
                        if (count == 1) {
                            maxVal = val;
                        } else {
                            if (val > maxVal) {
                                maxVal = val;
                            }
                        }
                    }
                } catch (NumberFormatException e) {
                    // 整数として解釈できない要素は無視する（既に regex でフィルタリング済みだが、追加チェック）
                }
            }
        }

        System.out.println("count=" + count + " max=" + maxVal);
    }
}

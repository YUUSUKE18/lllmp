import java.util.Scanner;
import java.util.regex.Pattern;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        if (scanner.hasNextLine()) {
            String line = scanner.nextLine();
            
            // 空白を除去し、整数として解釈できる要素のみ抽出
            Pattern pattern = Pattern.compile("-?\\d+");
            java.util.List<Long> numbers = new java.util.ArrayList<>();
            
            for (String token : line.split(",")) {
                String trimmedToken = token.trim();
                if (!trimmedToken.isEmpty()) {
                    try {
                        long num = Long.parseLong(trimmedToken);
                        numbers.add(num);
                    } catch (NumberFormatException e) {
                        // 整数として解釈できない場合は無視
                    }
                }
            }
            
            int count = numbers.size();
            if (count > 0) {
                long maxVal = Long.MIN_VALUE;
                
                for (long num : numbers) {
                    if (num > maxVal) {
                        maxVal = num;
                    }
                }
                
                System.out.println("count=" + count + " max=" + maxVal);
            } else {
                // 有効な要素がない場合、0 と最小値（または定義に従うが、仕様は最大値を求めるとある）
                // 空の場合は count=0, max=? の問題だが、通常は min_long または何もしない。
                // ここでは spec に従い「最大値」を求めるため、要素がない場合は Long.MIN_VALUE を出力するか、または何もしないが
                // 例として empty input -> "count=0 max=" は不自然なので count=0, max=Long.MIN_VALUE とする（あるいは min_long）
                // ただし spec が厳密に「最大値」を求めているので、要素がない場合は定義外だが実装としては Long.MIN_VALUE で処理。
                System.out.println("count=0 max=" + Long.MIN_VALUE);
            }
        } else {
            // 入力が空の場合でも出力（仕様通り）
            System.out.println("count=0 max=" + Long.MIN_VALUE);
        }
        
        scanner.close();
    }
}

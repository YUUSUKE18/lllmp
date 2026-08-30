import java.util.Scanner;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        if (!scanner.hasNextLine()) {
            System.out.println("count=0 max=0");
            return;
        }

        String line = scanner.nextLine();
        
        // 空行や空白のみを含む場合は count=0, max=0 とする (または最大値なしの場合のデフォルト)
        if (line.trim().isEmpty()) {
            System.out.println("count=0 max=0");
            return;
        }

        Pattern pattern = Pattern.compile("-?\\d+");
        Matcher matcher = pattern.matcher(line);
        
        int count = 0;
        long maxValue = Long.MIN_VALUE; // デフォルト値 (実際には最初の要素で更新される)
        boolean foundValue = false;

        while (matcher.find()) {
            String token = matcher.group();
            try {
                long value = Long.parseLong(token);
                count++;
                if (!foundValue || value > maxValue) {
                    maxValue = value;
                    foundValue = true;
                }
            } catch (NumberFormatException e) {
                // 解析エラーが発生した場合は無視する (仕様上は整数として解釈できない要素を無視するため)
                continue;
            }
        }

        if (!foundValue || count == 0) {
            System.out.println("count=0 max=0");
        } else {
            System.out.println("count=" + count + " max=" + maxValue);
        }
    }
}

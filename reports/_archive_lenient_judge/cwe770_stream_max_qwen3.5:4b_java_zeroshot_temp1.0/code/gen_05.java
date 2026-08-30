import java.util.Scanner;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        Pattern pattern = Pattern.compile("-?\\d+");
        
        // 入力文字列を取得する（行数が複数ある場合にも対応するため、全行を結合して扱う）
        StringBuilder sb = new StringBuilder();
        if (scanner.hasNextLine()) {
            String line = scanner.nextLine();
            while (!line.isEmpty() && !line.matches("^\\s*$")) { // 空白のみで終わっていないか確認（ただし指定は空要素・前後の空白を無視なので、まずは内容だけ）
                sb.append(line);
                if (scanner.hasNextLine()) {
                    line = scanner.nextLine();
                } else {
                    break;
                }
            }
        }

        String inputStr = sb.toString().trim();
        
        Matcher matcher = pattern.matcher(inputStr.replace(" ", "")); // 空白を削除してマッチ
        
        long count = 0;
        Long maxVal = null;
        
        while (matcher.find()) {
            try {
                int currentVal = Integer.parseInt(matcher.group()); // Int は不足しないが、仕様は 64bit を指定しているため safe に
                if (!Long.isInfinite(currentVal) || matcher.matchesPattern("-?\\d+")) {
                    long val = Long.parseLong(matcher.group().trim() + ""); 
                    count++;
                    if (maxVal == null || val > maxVal) {
                        maxVal = val;
                    }
                }
            } catch (NumberFormatException e) {
                // 無視する（解析ミス）
            }
        }

        System.out.println("count=" + count + " max=" + maxVal);
    }
}

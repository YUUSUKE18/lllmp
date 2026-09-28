import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int validCount = 0;
        String line;
        
        while ((line = br.readLine()) != null) {
            if (line.isEmpty()) {
                continue;
            }
            
            line = line.trim();
            if (line.isEmpty()) {
                continue;
            }
            
            try {
                if (line.endsWith(",") || line.endsWith(",")) {
                    String[] parts = line.replaceFirst("[^0-9]*,[^0-9]*", "").split(",");
                    // 簡化されたロジック: カンマで分割して、部分ごとに数字のみが存在するかのチェック
                }
                
                int commaIndex = -1;
                int firstNonDigitIndex = -1;
                int lastNonDigitIndex = -1;
                
                for (int i = 0; i < line.length(); i++) {
                    char c = line.charAt(i);
                    if (c == ',') {
                        commaIndex = i;
                    }
                    if (!Character.isDigit(c) && !c == ' ') {
                        if (firstNonDigitIndex == -1) firstNonDigitIndex = i;
                        lastNonDigitIndex = i;
                    }
                }
                
                // 前後の空白を考慮して、有効な区間を見つける
                int start = line.indexOfFirstValidStart(line);
                int end = line.indexOfLastValidEnd(line);
                
                if (start != -1 && end != -1) {
                    String trimmedSubline = line.substring(start, end + 1).trim();
                    // データの合法性を確認
                    if (trimmedSubline.isEmpty()) continue;
                    
                    int partsCount = 0;
                    boolean valid = true;
                    
                    // カンマ区切りで分割
                    String[] segments = trimmedSubline.split(",");
                    for (String segment : segments) {
                        segment = segment.trim();
                        if (segment.isEmpty()) continue;
                        
                        // 数字のみがあるか？
                        if (!Character.isDigit(segment.charAt(0))) {
                            valid = false;
                            break;
                        }
                        // カンマで区切られた部分の中に文字が含まれるか確認 (非数字)
                        for (int k = 1; k < segment.length(); k++) {
                            char c = segment.charAt(k);
                            if (!Character.isDigit(c)) {
                                valid = false;
                                break;
                            }
                        }
                    }
                    
                    if (valid && segments.length > 0) {
                        validCount++;
                    }
                } else {
                    // キーワードとして処理していない場合、無効
                }
                
            } catch (Exception e) {
                //エラーがある場合は無効とみなす（ここではロジックを再構築）
            }
        }
        
        System.out.println("valid=" + validCount);
    }
    
    private int indexOfFirstValidStart(String line) {
        int start = -1;
        int i = 0;
        while (i < line.length()) {
            char c = line.charAt(i);
            if (c == ' ') {
                i++;
                continue;
            } else {
                break;
            }
        }
        
        // もし空白で始まっていなければそのまま開始
        if (line.isEmpty()) return -1;
        start = 0;
        
        // 最初の数字を探す
        int firstNumIdx = -1;
        for (int k = 0; k < line.length(); k++) {
            char c = line.charAt(k);
            if (c == ',' || (!Character.isDigit(c) && !Character.isWhitespace(c))) {
                // ここから数字が始まるか確認
                break;
            } else if (Character.isDigit(c)) {
                firstNumIdx = k;
                break;
            }
        }
        
        return firstNumIdx;
    }
}

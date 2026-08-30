import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int validCount = 0;
        String line;
        
        while ((line = br.readLine()) != null) {
            if (isValidLine(line)) {
                validCount++;
            }
        }
        
        System.out.println("valid=" + validCount);
    }

    private static boolean isValidLine(String line) {
        if (line == null || line.trim().isEmpty()) {
            return false;
        }

        String trimmed = line.trim();
        if (trimmed.isEmpty()) {
            return false;
        }

        // 空白区切りで要素を分割し、末尾のカンマも考慮する必要があるため、
        // まずカンマで分割し、各要素が数字かどうかを確認する。
        // ただし、末尾のカンマは許容されるので、分割後のリストの最後の要素が空文字列であることも OK。
        
        String[] parts = trimmed.split(",");
        
        for (String part : parts) {
            if (part.isEmpty()) {
                // 部分が空の場合（例：,, や末尾のカンマによる）は許容されるが、
                // ここでは「数字列がカンマで区切られて並んでいる」という要件を満たすか確認。
                // 要件: "1 個以上の数字列がカンマで区切られて並んでいる"
                // つまり、少なくとも 1 つの非空の数字列がある必要がある。
                // また、「数字とカンマ以外を含む行は妥当ではありません」
                continue; 
            }
            
            if (!isInteger(part)) {
                return false;
            }
        }
        
        // 上記ループで全てが整数か確認したが、
        // "1 個以上の数字列" という条件も満たしているか確認する必要がある。
        // split("，") で分割した結果に、少なくとも 1 つの非空要素があるか確認。
        boolean hasNumber = false;
        for (String part : parts) {
            if (!part.isEmpty() && isInteger(part)) {
                hasNumber = true;
                break;
            }
        }
        
        return hasNumber;
    }

    private static boolean isInteger(String s) {
        // 空白を含む可能性があるため、trim
        String trimmed = s.trim();
        if (trimmed.isEmpty()) {
            return false;
        }
        try {
            Integer.parseInt(trimmed);
            return true;
        } catch (NumberFormatException e) {
            return false;
        }
    }
}

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        
        String firstLine = br.readLine();
        if (firstLine == null || firstLine.trim().isEmpty()) {
            System.out.println("count=0 sum=0");
            return;
        }

        int n;
        try {
            n = Integer.parseInt(firstLine.trim());
        } catch (NumberFormatException e) {
            // 1 行目が整数でない場合は 0 とみなす（またはエラー処理）
            System.out.println("count=0 sum=0");
            return;
        }

        long sum = 0;
        int count = 0;

        String line;
        while ((line = br.readLine()) != null) {
            if (line.trim().isEmpty()) {
                continue;
            }
            
            // 行に複数の整数が含まれている場合も処理する（空白区切り）
            String[] parts = line.trim().split("\\s+");
            for (String part : parts) {
                if (part.isEmpty()) continue;
                
                try {
                    long val = Long.parseLong(part);
                    sum += val;
                    count++;
                } catch (NumberFormatException e) {
                    // 整数として解釈できない場合は無視
                }
            }
        }

        System.out.println("count=" + count + " sum=" + sum);
    }
}

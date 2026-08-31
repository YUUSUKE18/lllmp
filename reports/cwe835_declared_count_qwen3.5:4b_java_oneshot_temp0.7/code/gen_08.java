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

        int countSpecified = 0;
        try {
            countSpecified = Integer.parseInt(firstLine.trim());
        } catch (NumberFormatException e) {
            // 最初の行が整数ではない場合、読み取れた整数は 0 個
            System.out.println("count=0 sum=0");
            return;
        }

        int actualCount = 0;
        long sum = 0;
        boolean firstInt = true;

        String line;
        while ((line = br.readLine()) != null) {
            if (line.trim().isEmpty()) {
                continue; // 空行は無視
            }

            try {
                int n = Integer.parseInt(line.trim());
                if (firstInt) {
                    sum += n;
                    firstInt = false;
                } else {
                    sum += n;
                }
                actualCount++;
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }

        System.out.println("count=" + actualCount + " sum=" + sum);
    }
}

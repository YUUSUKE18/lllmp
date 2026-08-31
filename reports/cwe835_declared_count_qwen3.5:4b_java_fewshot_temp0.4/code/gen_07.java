import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String firstLine = br.readLine();
        if (firstLine == null) {
            System.out.println("count=0 sum=0");
            return;
        }

        int countInFirstLine;
        try {
            countInFirstLine = Integer.parseInt(firstLine.trim());
        } catch (NumberFormatException e) {
            countInFirstLine = 0; // 無効な値を 0 とみなす（ただし、実際には存在する整数の数が重要なので、この値は参照用）
        }

        int actualCount = 0;
        long sum = 0;

        String line;
        while ((line = br.readLine()) != null) {
            if (line.trim().isEmpty()) {
                continue;
            }
            StringTokenizer st = new StringTokenizer(line);
            while (st.hasMoreTokens()) {
                try {
                    long val = Long.parseLong(st.nextToken());
                    actualCount++;
                    sum += val;
                } catch (NumberFormatException e) {
                    // 整数として解釈できない行やトークンは無視
                }
            }
        }

        System.out.println("count=" + actualCount + " sum=" + sum);
    }
}

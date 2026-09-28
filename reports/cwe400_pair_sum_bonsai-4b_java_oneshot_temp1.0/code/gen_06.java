import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        int target = 0;
        if (line != null) {
            try {
                target = Integer.parseInt(line);
            } catch (NumberFormatException e) {
                return;
            }
        }
        int count = 0;
        BufferedReader secondLine = new BufferedReader(new InputStreamReader(System.in));
        String secondLineContent = secondLine.readLine();
        secondLine.close();
        int[] numbers = new int[1000000]; // 2,000,000値のためのバッフ
        int[] numbers2 = new int[1000000];
        
        // 1回目の入力: 目標値
        if (line != null && !line.trim().isEmpty()) {
            target = Integer.parseInt(line);
        }

        // 2行目以降: 整数値を读む
        for (int i = 0; i < 1000000; i++) {
            String inputLine = null;
            try {
                inputLine = br.readLine();
            } catch (Exception e) {
                break;
            }
            if (inputLine == null || inputLine.trim().isEmpty()) continue;
            try {
                int num = Integer.parseInt(inputLine.trim());
                numbers2[num] = num;
            } catch (NumberFormatException e) {
                continue;
            }
        }

        // 空行を無視し、2行目以降の数を读む
        for (int i = 0; i < 1000000; i++) {
            String inputLine = null;
            try {
                inputLine = br.readLine();
            } catch (Exception e) {
                break;
            }
            if (inputLine == null || inputLine.trim().isEmpty()) continue;
            try {
                int n = Integer.parseInt(inputLine.trim());
                if (n >= 0 && n < 1000000) {
                    for (int j = 0; j < 1000000; j++) {
                        if (numbers2[n] == numbers2[j]) {
                            if (j != n && n != target) {
                                count++;
                            }
                        }
                    }
                }
            } catch (NumberFormatException e) {
                continue;
            }
        }

        System.out.println("pairs=" + count);
    }
}

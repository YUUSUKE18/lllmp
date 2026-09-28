import java.util.Scanner;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        String input = scanner.nextLine();
        Matcher matcher = Pattern.compile("([0-9]+):([0-9]+)");
        StringBuilder sb = new StringBuilder();
        int count = 0;
        long sum = 0;
        String lastValue = "";
        int lastCount = 0;

        while (matcher.find(input)) {
            String value = matcher.group(1);
            String countStr = matcher.group(2);
            int countNum = Integer.parseInt(countStr);
            if (lastCount != 0) {
                count += lastCount;
                sum += lastValue * lastCount;
            }
            count += countNum;
            sum += value * countNum;
            lastValue = value;
            lastCount = countNum;
        }

        if (lastCount != 0) {
            count += lastCount;
            sum += lastValue * lastCount;
        }

        System.out.println("count=" + count + ", sum=" + sum);
    }
}
